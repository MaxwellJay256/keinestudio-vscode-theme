import assert from "node:assert/strict";
import { copyFile, mkdir, mkdtemp, readFile, rm, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { alpha, palette, themeConfig } from "./theme-config.mjs";
import { buildTheme, formatTheme, modes } from "./build-themes.mjs";

const root = new URL("../", import.meta.url);
const script = fileURLToPath(new URL("./build-themes.mjs", import.meta.url));
const cloneConfig = () => structuredClone(themeConfig);

for (const mode of modes) {
  test(`${mode}：所有界面、TextMate 与 semantic token 项目均被迁移`, () => {
    const theme = buildTheme(mode);
    assert.equal(Object.keys(theme.colors).length, 396);
    assert.equal(theme.tokenColors.length, 46);
    assert.equal(Object.keys(theme.semanticTokenColors).length, 28);
    assert.equal(theme.type, mode);
    assert.equal(theme.semanticHighlighting, true);
    assert.deepEqual(JSON.parse(formatTheme(theme)), theme);
  });

  test(`${mode}：生成文件必须与 JS 配置一致`, async () => {
    const actual = await readFile(new URL(`themes/keinestudio-${mode}-color-theme.json`, root), "utf8");
    assert.equal(actual.replace(/\r\n/g, "\n"), formatTheme(buildTheme(mode)));
  });

  test(`${mode}：关键语法角色在三个配色层之间保持同步`, () => {
    const theme = buildTheme(mode);
    const cases = [
      ["字符串", "string", "string"],
      ["关键字与存储修饰符", "keyword", "keyword"],
      ["函数、方法与构造函数", "function", "function"],
      ["类型、类与命名空间", "type", "class"],
      ["普通变量与参数", "variable", "variable"],
      ["数字、常量与枚举成员", "number", "number"],
    ];
    for (const [name, semantic, icon] of cases) {
      const rule = theme.tokenColors.find(rule => rule.name === name);
      assert.equal(rule.settings.foreground, theme.semanticTokenColors[semantic]);
      assert.equal(rule.settings.foreground, theme.colors[`symbolIcon.${icon}Foreground`]);
    }
    assert.deepEqual(theme.tokenColors.find(rule => rule.name === "Markdown 斜体").settings, { fontStyle: "italic" });
    assert.equal(theme.tokenColors.find(rule => rule.name === "文档标签").settings.fontStyle, "");
    assert.deepEqual(theme.semanticTokenColors["*.deprecated"], { strikethrough: true });
  });
}

test("每个颜色类别都定义深浅两种颜色，且所有类别均被引用", () => {
  const used = new Set(themeConfig.uiSections.flatMap(section => Object.values(section.colors)));
  for (const rule of themeConfig.textMateRules) if (rule.role) used.add(rule.role);
  for (const rule of Object.values(themeConfig.semanticRules)) {
    if (typeof rule === "string") used.add(rule);
    else if (rule.role) used.add(rule.role);
  }
  assert.deepEqual([...used].sort(), Object.keys(themeConfig.roles).sort());
  for (const role of Object.values(themeConfig.roles)) {
    for (const mode of modes) assert.match(role[mode], /^#[0-9A-F]{6}(?:[0-9A-F]{2})?$/);
  }
});

test("修改一个角色可同步影响三个配色层，不影响另一主题或其他语义", () => {
  const config = cloneConfig();
  config.roles["syntax.string"].light = palette.red[500];
  const light = buildTheme("light", config);
  assert.equal(light.colors["symbolIcon.stringForeground"], palette.red[500]);
  assert.equal(light.semanticTokenColors.string, palette.red[500]);
  assert.equal(light.tokenColors.find(rule => rule.name === "字符串").settings.foreground, palette.red[500]);
  assert.equal(light.semanticTokenColors.number, buildTheme("light").semanticTokenColors.number);
  assert.deepEqual(buildTheme("dark", config), buildTheme("dark"));
});

test("构建不修改配置，多次生成结果相同", () => {
  const config = cloneConfig();
  const before = structuredClone(config);
  assert.equal(formatTheme(buildTheme("dark", config)), formatTheme(buildTheme("dark", config)));
  assert.deepEqual(config, before);
});

test("拒绝未知角色、重复项目、缺失色值与不合法颜色", () => {
  const unknown = cloneConfig();
  unknown.uiSections[0].colors.foreground = "missing.role";
  assert.throws(() => buildTheme("dark", unknown), /未定义的配色角色/);
  const duplicate = cloneConfig();
  duplicate.uiSections.push({ name: "重复项", colors: { foreground: "text.primary" } });
  assert.throws(() => buildTheme("light", duplicate), /界面项目重复归类/);
  for (const invalid of [undefined, "#FFF", "not-a-color"]) {
    const config = cloneConfig();
    config.roles["syntax.string"].light = invalid;
    assert.throws(() => buildTheme("dark", config), /缺失或不是有效的 HEX/);
  }
  assert.throws(() => buildTheme("unknown"), /未知主题模式/);
});

test("透明度工具只接受六位色号与两位 HEX Alpha", () => {
  // 使用独立的测试色号，避免修改主题调色板时让工具测试误报。
  assert.equal(alpha("#214B73", "cc"), "#214B73CC");
  assert.equal(alpha("#123ABC", "00"), "#123ABC00");
  assert.equal(alpha("#123ABC", "FF"), "#123ABCFF");
  for (const [color, opacity] of [["#FFF", "CC"], ["#214B73CC", "CC"], ["#FEFEFE", "100"], ["#FEFEFE", "ZZ"]]) {
    assert.throws(() => alpha(color, opacity), /alpha 需要/);
  }
});

test("命令行检查不依赖当前工作目录", () => {
  const result = spawnSync(process.execPath, [script, "--check"], { cwd: tmpdir(), encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
});

test("检查模式拒绝过期或缺失文件且不写入；生成命令可从零重建", async () => {
  const directory = await mkdtemp(join(tmpdir(), "keinestudio-theme-test-"));
  try {
    const scripts = join(directory, "scripts");
    const themes = join(directory, "themes");
    await mkdir(scripts);
    await mkdir(themes);
    for (const name of ["build-themes.mjs", "theme-config.mjs"]) {
      await copyFile(new URL(`scripts/${name}`, root), join(scripts, name));
    }
    const run = (...args) => spawnSync(process.execPath, [join(scripts, "build-themes.mjs"), ...args], { cwd: tmpdir(), encoding: "utf8" });
    const dark = join(themes, "keinestudio-dark-color-theme.json");
    const light = join(themes, "keinestudio-light-color-theme.json");
    assert.equal(run("--check").status, 1);
    await assert.rejects(readFile(dark), { code: "ENOENT" });
    assert.equal(run().status, 0);
    assert.equal(run("--check").status, 0);
    await writeFile(dark, "{}\n");
    await unlink(light);
    assert.equal(run("--check").status, 1);
    assert.equal(await readFile(dark, "utf8"), "{}\n");
    await assert.rejects(readFile(light), { code: "ENOENT" });
    assert.equal(run().status, 0);
    assert.equal(await readFile(dark, "utf8"), formatTheme(buildTheme("dark")));
    assert.equal(await readFile(light, "utf8"), formatTheme(buildTheme("light")));
    assert.equal(run("--invalid").status, 1);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
