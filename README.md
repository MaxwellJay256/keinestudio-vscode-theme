# KeineStudio VS Code Theme

基于 KeineStudio 调色板的 VS Code 主题，提供 **KeineStudio Dark** 与 **KeineStudio Light**。
暗色版采用藏蓝画布与慧音蓝界面，浅色版采用冰蓝画布；代码使用克制的红绿高亮。
无渐变色，不修改编辑器字体或布局。

## 主题配色

绿色只用于字符串、成功、新增等特定语义，不作为全局界面强调色。错误与日常语法高亮共用红色系，通过诊断波浪线、图标和位置等进一步区分。

主题同时提供 TextMate 和 semantic token 配色，覆盖常见代码、JSON、CSS、HTML、Markdown 与 Diff；语义高亮的实际细分能力取决于语言扩展。
界面配色包含侧边栏、菜单、选区、补全、诊断、Git 状态、调试、通知和终端。

终端 ANSI 配色采用调色板内的风格化映射：品红映射为浅红，青色映射为浅蓝，亮黄与普通黄共用满月黄。
需要依靠青／蓝、品红／红严格区分类别的终端工具，应额外使用文字标签或符号。

## 本地预览

1. 在 VS Code 中以此目录（包含 `package.json` 的 `keinestudio-vscode-theme`）作为工作区打开。
2. 按 `F5`，使用已有的 `Extension` 调试配置启动扩展开发宿主。
3. 在新窗口运行 `Preferences: Color Theme`，选择 **KeineStudio Dark** 或 **KeineStudio Light**。
4. 打开日常使用的代码文件，并检查补全、悬浮提示、搜索、Diff 与终端效果。

也可以从当前仓库的外层目录启动开发宿主：

```sh
code --new-window --extensionDevelopmentPath="$(pwd)/keinestudio-dark"
```

该命令适用于 Bash，且需要在包含 `keinestudio-vscode-theme` 的目录中执行。

## 定制与生成主题

两个主题统一由 [scripts/theme-config.mjs](scripts/theme-config.mjs) 管理，
[themes/](themes/) 下的 JSON 是生成结果，请不要直接编辑，否则下次生成会覆盖这些修改。

### 配置结构

| 配置 | 用途 |
| --- | --- |
| `palette` | 集中定义慧音蓝、慧音红、慧音绿及辅助色的 HEX 色号 |
| `roles` | 按用途分类，每个类别分别定义 `dark` 和 `light` 颜色 |
| `uiSections` | 将所有 `colors` 项目按界面区域分区，并指向对应类别 |
| `textMateRules` | 定义 TextMate scope、颜色类别与字体样式，保留规则优先级顺序 |
| `semanticRules` | 定义 semantic token 到类别的映射，与 TextMate 共用语法角色 |

例如，字符串对应的类别为：

```js
"syntax.string": {
  dark: palette.green[600],
  light: palette.green[900]
}
```

修改这个类别后，字符串的 TextMate 高亮、semantic token 高亮和符号图标会同步更新。
只修改 `light` 不会影响暗色主题；修改 `palette.green[900]` 则会影响所有引用这一色阶的浅色或暗色类别。
即使当前颜色相同，不同用途也可以拥有独立类别，例如 `syntax.number`、`status.warning` 和终端 ANSI 槽位。

当前配置保留浅色主题的冰蓝背景 `palette.ice`（`#F4FAFF`），以及暗色主题沿用的 `palette.februaryGray`（`#7F92A3`）。
透明选区、搜索与 Diff 底色通过 `alpha(palette.blue[500], "26")` 这样的写法添加两位 HEX Alpha，不是渐变。
仅指定字体样式的规则不需要颜色类别，继续继承前景色。

### 生成与检查

需要 Node.js 22 或更新版本，不需要安装额外依赖。在项目根目录运行：

```sh
npm run build:themes  # 根据 JS 配置重新生成 Dark / Light 两个主题
npm run check:themes  # 只检查生成文件是否与配置一致，不写入文件
npm test             # 检查覆盖范围、角色同步、配置错误与生成命令
```

生成器会拒绝缺少深浅色值、引用不存在的类别或跨分区重复归类的界面项目。
添加新的 VS Code 配色项目时，在相应分区中指定类别；添加新的颜色用途时，在 `roles` 中同时定义 `dark` 和 `light`。
测试中记录了当前项目数量，增加项目后也应更新相应的覆盖断言。
通过 `vsce` 打包或发布时会自动运行 `vscode:prepublish` 重新生成主题。
生成脚本与测试不包含在扩展安装包中，用户使用主题时不需要运行 Node.js。

生成后可运行 `Developer: Reload Window` 或重新启动扩展开发宿主，选择主题进行预览。
用户已有的 `workbench.colorCustomizations`、`editor.tokenColorCustomizations`、`editor.semanticTokenColorCustomizations` 或扩展注入样式可能覆盖主题效果。
