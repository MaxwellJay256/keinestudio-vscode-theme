# KeineStudio Dark

基于 KeineStudio 调色板的 VS Code 暗色主题：藏蓝画布、慧音蓝界面，以及克制的红绿代码高亮。
无渐变色，不修改编辑器字体或布局。

## 配色

| 角色 | 颜色 |
| --- | --- |
| 编辑器、终端背景 | 藏蓝 `#000022` |
| 侧边栏、标签页、面板 | 慧音蓝 950／900 |
| 菜单、悬浮提示 | 慧音蓝 900 |
| 选择、焦点、按钮 | 慧音蓝中间色阶 |
| 正文、普通变量 | 灰 `#CBCAD0` |
| 注释、次要说明 | 二月灰 `#7F92A3` |
| 关键字 | 慧音红 300 `#D46868` |
| 函数、方法 | 慧音红 200 `#E19999` |
| 类型、类、命名空间 | 慧音蓝 200 `#8FB5D9` |
| 字符串 | 慧音绿 600 `#A5C491` |
| 数字、常量、警告 | 满月黄 `#E9DEB1` |

绿色只用于字符串、成功、新增等特定语义，不作为全局界面强调色。错误与日常语法高亮共用红色系，通过诊断波浪线、图标和位置等进一步区分。

主题同时提供 TextMate 和 semantic token 配色，覆盖常见代码、JSON、CSS、HTML、Markdown 与 Diff；语义高亮的实际细分能力取决于语言扩展。
界面配色包含侧边栏、菜单、选区、补全、诊断、Git 状态、调试、通知和终端。

终端 ANSI 配色采用调色板内的风格化映射：品红映射为浅红，青色映射为浅蓝，亮黄与普通黄共用满月黄。
需要依靠青／蓝、品红／红严格区分类别的终端工具，应额外使用文字标签或符号。

## 本地预览

1. 在 VS Code 中以此目录（包含 `package.json` 的 `keinestudio-dark`）作为工作区打开。
2. 按 `F5`，使用已有的 `Extension` 调试配置启动扩展开发宿主。
3. 在新窗口运行 `Preferences: Color Theme`，选择 **KeineStudio Dark**。
4. 打开日常使用的代码文件，并检查补全、悬浮提示、搜索、Diff 与终端效果。

也可以从当前仓库的外层目录启动开发宿主：

```sh
code --new-window --extensionDevelopmentPath="$(pwd)/keinestudio-dark"
```

该命令适用于 Bash，且需要在包含 `keinestudio-dark` 的目录中执行。

## 定制

编辑 `themes/KeineStudio Dark-color-theme.json`：

- `colors`：VS Code 界面和终端。
- `tokenColors`：TextMate 语法高亮。
- `semanticTokenColors`：语言扩展提供的语义高亮。

透明选区、搜索与 Diff 底色由调色板颜色加 Alpha 通道构成，不是渐变。
用户已有的 `workbench.colorCustomizations`、`editor.tokenColorCustomizations`、`editor.semanticTokenColorCustomizations` 或扩展注入样式可能覆盖主题效果。
