import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { themeConfig } from "./theme-config.mjs";

export const modes = ["dark", "light"];
const hexColor = /^#[0-9A-F]{6}(?:[0-9A-F]{2})?$/i;

// 构建过程只读取 JS 配置，不把生成的 JSON 当作输入。
export function buildTheme(mode, config = themeConfig) {
  if (!modes.includes(mode)) throw new Error(`未知主题模式：${mode}`);

  for (const [name, pair] of Object.entries(config.roles)) {
    for (const variant of modes) {
      if (typeof pair?.[variant] !== "string" || !hexColor.test(pair[variant])) {
        throw new Error(`配色角色 ${name}.${variant} 缺失或不是有效的 HEX 色号`);
      }
    }
  }

  function color(role) {
    if (!Object.hasOwn(config.roles, role)) {
      throw new Error(`未定义的配色角色：${role}`);
    }
    return config.roles[role][mode];
  }

  const colors = {};
  for (const section of config.uiSections) {
    for (const [key, role] of Object.entries(section.colors)) {
      if (Object.hasOwn(colors, key)) {
        throw new Error(`界面项目重复归类：${key}（${section.name}）`);
      }
      colors[key] = color(role);
    }
  }

  const tokenColors = config.textMateRules.map(({ name, scope, role, fontStyle }) => {
    if (!Array.isArray(scope) || scope.length === 0 || scope.some(s => typeof s !== "string")) {
      throw new Error(`TextMate 规则 ${name} 必须包含非空的 scope 数组`);
    }
    const settings = {};
    if (role !== undefined) settings.foreground = color(role);
    // 空字符串有清除继承样式的含义，不能当作缺失值处理。
    if (fontStyle !== undefined) settings.fontStyle = fontStyle;
    return { name, scope: [...scope], settings };
  });

  const semanticTokenColors = {};
  for (const [selector, rule] of Object.entries(config.semanticRules)) {
    if (typeof rule === "string") {
      semanticTokenColors[selector] = color(rule);
    } else {
      const { role, ...styles } = rule;
      semanticTokenColors[selector] = {
        ...(role === undefined ? {} : { foreground: color(role) }),
        ...styles,
      };
    }
  }

  return {
    $schema: "vscode://schemas/color-theme",
    name: `KeineStudio ${mode === "dark" ? "Dark" : "Light"}`,
    type: mode,
    semanticHighlighting: true,
    colors,
    tokenColors,
    semanticTokenColors,
  };
}

// 保持原主题的紧凑排版，同时保留 TextMate 优先级顺序。
export function formatTheme(theme) {
  const json = value => JSON.stringify(value);
  const inlineObject = object => `{ ${Object.entries(object)
    .map(([key, value]) => `${json(key)}: ${json(value)}`).join(", ")} }`;
  const colors = Object.entries(theme.colors)
    .map(([key, value]) => `    ${json(key)}: ${json(value)}`).join(",\n");
  const tokenColors = theme.tokenColors.map(rule => [
    "    {",
    `      "name": ${json(rule.name)},`,
    `      "scope": [${rule.scope.map(json).join(", ")}],`,
    `      "settings": ${inlineObject(rule.settings)}`,
    "    }",
  ].join("\n")).join(",\n");
  const semantic = Object.entries(theme.semanticTokenColors)
    .map(([key, value]) => `    ${json(key)}: ${typeof value === "string" ? json(value) : inlineObject(value)}`)
    .join(",\n");
  return [
    "{",
    `  "$schema": ${json(theme.$schema)},`,
    `  "name": ${json(theme.name)},`,
    `  "type": ${json(theme.type)},`,
    `  "semanticHighlighting": ${json(theme.semanticHighlighting)},`,
    '  "colors": {', colors, "  },",
    '  "tokenColors": [', tokenColors, "  ],",
    '  "semanticTokenColors": {', semantic, "  }",
    "}", "",
  ].join("\n");
}

async function main(args) {
  if (args.length > 1 || (args.length === 1 && !["--check", "--help"].includes(args[0]))) {
    throw new Error("用法：node scripts/build-themes.mjs [--check | --help]");
  }
  if (args[0] === "--help") {
    console.log("编辑 scripts/theme-config.mjs 后运行本脚本生成主题；--check 仅检查生成结果是否最新，不写入文件。");
    return;
  }
  // 写入前先构建并验证两种模式，避免配置错误时仅更新其中一份。
  const outputs = modes.map(mode => ({
    mode,
    content: formatTheme(buildTheme(mode)),
    path: new URL(`../themes/keinestudio-${mode}-color-theme.json`, import.meta.url),
  }));
  for (const { mode, content, path } of outputs) {
    if (args[0] === "--check") {
      let current;
      try {
        current = await readFile(path, "utf8");
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
      if (current?.replace(/\r\n/g, "\n") !== content) {
        console.error(`${mode} 主题缺失或不是最新，请运行 npm run build:themes。`);
        process.exitCode = 1;
      } else {
        console.log(`${mode} 主题与配置一致。`);
      }
    } else {
      await writeFile(path, content, "utf8");
      console.log(`已生成 KeineStudio ${mode === "dark" ? "Dark" : "Light"}。`);
    }
  }
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  main(process.argv.slice(2)).catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
