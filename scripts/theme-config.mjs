// 主题的唯一配色源：先编辑 palette，再按用途调整 roles 中的 dark / light。
// uiSections、textMateRules 和 semanticRules 只引用角色，不直接填写色号。
// 修改后运行 npm run build:themes；themes 下的 JSON 是生成结果，不是输入。

export const palette = {
  blue: {
    50: "#F8FAFC",
    100: "#C4D7EA",
    200: "#8FB5D9",
    300: "#5892C9",
    400: "#336FA7",
    500: "#214B73",
    600: "#1B4266",
    700: "#153858",
    800: "#1B2D3F",
    900: "#172430",
    950: "#121A21",
  },
  red: {
    50: "#FCF7F7",
    100: "#EEC9C9",
    200: "#E19999",
    300: "#D46868",
    400: "#C93636",
    500: "#9D2727",
    600: "#871F1F",
    700: "#711717",
    800: "#5B1111",
    900: "#381818",
    950: "#221111",
  },
  green: {
    50: "#FAFBF9",
    100: "#F1F4EF",
    200: "#E8EDE4",
    300: "#DEE7D9",
    400: "#D5E1CD",
    500: "#CBDBC0",
    600: "#A5C491",
    700: "#7EAE5E",
    800: "#5B853F",
    900: "#395626",
    950: "#191A19",
  },
  white: "#FEFEFE",
  ice: "#FBFBFF",
  gray: "#CBCAD0",
  navy: "#000022",
  moonYellow: "#E9DEB1",
  februaryGray: "#7F92A3",
};

// ice 保留当前浅色主题的冰蓝背景；februaryGray 沿用暗色主题的注释灰。
// 透明度使用两位 HEX Alpha，不是渐变。
export function alpha(color, opacity) {
  if (!/^#[0-9A-F]{6}$/i.test(color) || !/^[0-9A-F]{2}$/i.test(opacity)) {
    throw new Error("alpha 需要六位 HEX 色号和两位 HEX 透明度");
  }
  return color + opacity.toUpperCase();
}

// 每个角色分别指定 dark 和 light；同色但用途不同的角色可以独立调整。
export const roles = {
  // 正文与普通界面文本
  "text.primary": { dark: palette.gray, light: palette.blue[900] },
  // 次要说明、占位与弱化文字
  "text.secondary": { dark: palette.februaryGray, light: alpha(palette.blue[500], "CC") },
  // 错误诊断与失败状态
  "status.error": { dark: palette.red[200], light: palette.red[600] },
  // 焦点与交互边框
  "border.focus": { dark: palette.blue[300], light: palette.blue[500] },
  // 隐藏边框
  "border.transparent": { dark: alpha(palette.navy, "00"), light: alpha(palette.ice, "00") },
  // 主按钮与强调填充
  "interaction.accent": { dark: palette.blue[500], light: palette.blue[500] },
  // 菜单、浮层与普通边框
  "border.standard": { dark: palette.blue[400], light: palette.blue[200] },
  // 浮层与粘性滚动阴影
  "surface.shadow": { dark: alpha(palette.navy, "80"), light: alpha(palette.navy, "1A") },
  // 图标、标题与强调文字
  "text.accent": { dark: palette.blue[100], light: palette.blue[600] },
  // 链接及信息提示
  "text.link": { dark: palette.blue[200], light: palette.blue[400] },
  // 编辑器与终端主画布
  "surface.canvas": { dark: palette.navy, light: palette.ice },
  // 行内代码
  "text.code": { dark: palette.green[500], light: palette.green[900] },
  // 深色强调底上的文字
  "text.onAccent": { dark: palette.blue[50], light: palette.ice },
  // 主按钮悬停填充
  "interaction.accentHover": { dark: palette.blue[400], light: palette.blue[600] },
  // 次级按钮与非活动选区
  "interaction.secondary": { dark: palette.blue[800], light: alpha(palette.blue[100], "66") },
  // 次级按钮悬停填充
  "interaction.secondaryHover": { dark: palette.blue[700], light: palette.blue[100] },
  // 输入框与复选框边框
  "border.control": { dark: palette.februaryGray, light: palette.blue[300] },
  // 菜单、提示与补全浮层
  "surface.elevated": { dark: palette.blue[900], light: palette.ice },
  // 输入错误背景
  "validation.errorBackground": { dark: palette.red[900], light: palette.red[50] },
  // 输入错误文字
  "validation.errorText": { dark: palette.red[100], light: palette.red[600] },
  // 输入错误边框
  "validation.errorBorder": { dark: palette.red[300], light: palette.red[600] },
  // 输入警告背景
  "validation.warningBackground": { dark: palette.blue[900], light: alpha(palette.moonYellow, "66") },
  // 输入警告文字与边框
  "validation.warningText": { dark: palette.moonYellow, light: palette.blue[700] },
  // 列表悬停与焦点填充
  "interaction.hover": { dark: palette.blue[700], light: alpha(palette.blue[100], "66") },
  // 输入信息文字
  "validation.infoText": { dark: palette.blue[100], light: palette.blue[500] },
  // 滚动条默认填充
  "scrollbar.normal": { dark: alpha(palette.februaryGray, "33"), light: alpha(palette.blue[500], "26") },
  // 滚动条悬停填充
  "scrollbar.hover": { dark: alpha(palette.februaryGray, "55"), light: alpha(palette.blue[500], "44") },
  // 滚动条拖动填充
  "scrollbar.active": { dark: alpha(palette.blue[200], "66"), light: alpha(palette.blue[500], "66") },
  // 进度与自动修复提示
  "interaction.progress": { dark: palette.blue[200], light: palette.blue[500] },
  // 界面分隔线与缩进辅助线
  "border.subtle": { dark: palette.blue[800], light: palette.blue[100] },
  // 活动标签与面板指示线
  "border.active": { dark: palette.blue[200], light: palette.blue[600] },
  // 活动区域与标签悬停
  "interaction.tileHover": { dark: palette.blue[900], light: alpha(palette.blue[100], "66") },
  // 活动选区填充
  "selection.background": { dark: palette.blue[600], light: palette.blue[500] },
  // 浅色悬停底上的文字
  "text.onHover": { dark: palette.blue[50], light: palette.blue[600] },
  // 列表匹配文字
  "text.match": { dark: palette.blue[200], light: palette.blue[700] },
  // 焦点列表匹配文字
  "text.focusMatch": { dark: palette.blue[100], light: palette.blue[700] },
  // 警告图标、诊断与提示
  "status.warning": { dark: palette.moonYellow, light: palette.blue[500] },
  // 强匹配、括号与拖放底色
  "highlight.strong": { dark: alpha(palette.blue[500], "66"), light: alpha(palette.blue[500], "26") },
  // 菜单与通知分隔线
  "border.separator": { dark: palette.blue[400], light: palette.blue[100] },
  // Git 修改与文件修改指示
  "status.modified": { dark: palette.moonYellow, light: palette.blue[400] },
  // 当前行与设置行悬停
  "highlight.line": { dark: alpha(palette.navy, "80"), light: alpha(palette.blue[500], "08") },
  // 非活动编辑器与终端选区
  "selection.inactive": { dark: alpha(palette.blue[500], "66"), light: alpha(palette.blue[500], "1A") },
  // 同词与选区匹配底色
  "highlight.word": { dark: alpha(palette.blue[500], "44"), light: alpha(palette.blue[500], "1A") },
  // 当前搜索匹配底色
  "search.match": { dark: alpha(palette.moonYellow, "33"), light: alpha(palette.moonYellow, "99") },
  // 其他搜索匹配底色
  "search.otherMatch": { dark: alpha(palette.moonYellow, "1A"), light: alpha(palette.moonYellow, "44") },
  // 其他搜索匹配边框
  "search.otherBorder": { dark: alpha(palette.moonYellow, "66"), light: alpha(palette.blue[500], "80") },
  // 范围匹配底色
  "highlight.range": { dark: alpha(palette.blue[500], "22"), light: alpha(palette.blue[500], "1A") },
  // 悬停代码底色
  "highlight.hover": { dark: alpha(palette.blue[500], "33"), light: alpha(palette.blue[500], "1A") },
  // 空白字符
  "editor.whitespace": { dark: alpha(palette.februaryGray, "33"), light: alpha(palette.blue[500], "44") },
  // 成功状态与 Git 新增
  "status.added": { dark: palette.green[600], light: palette.green[900] },
  // Git 删除与断点
  "status.deleted": { dark: palette.red[300], light: palette.red[500] },
  // 未使用代码的透明度遮罩
  "editor.unnecessaryOpacity": { dark: alpha(palette.navy, "AA"), light: alpha(palette.navy, "AA") },
  // 内嵌提示背景
  "editor.inlayBackground": { dark: palette.navy, light: alpha(palette.blue[100], "66") },
  // 选中补全项的匹配文字
  "text.selectedMatch": { dark: palette.blue[100], light: palette.ice },
  // Diff 新增文字底色
  "diff.addedText": { dark: alpha(palette.green[700], "26"), light: alpha(palette.green[800], "26") },
  // Diff 删除文字底色
  "diff.removedText": { dark: alpha(palette.red[300], "26"), light: alpha(palette.red[500], "26") },
  // Diff 新增行底色
  "diff.addedLine": { dark: alpha(palette.green[700], "0F"), light: alpha(palette.green[800], "0F") },
  // Diff 删除行底色
  "diff.removedLine": { dark: alpha(palette.red[300], "0F"), light: alpha(palette.red[500], "0F") },
  // 合并当前内容底色
  "merge.currentContent": { dark: alpha(palette.blue[500], "26"), light: alpha(palette.blue[500], "0D") },
  // 合并传入标题底色
  "merge.incomingHeader": { dark: alpha(palette.green[700], "33"), light: alpha(palette.green[800], "26") },
  // 合并传入内容底色
  "merge.incomingContent": { dark: alpha(palette.green[700], "14"), light: alpha(palette.green[800], "0D") },
  // 合并共同祖先标题底色
  "merge.commonHeader": { dark: alpha(palette.februaryGray, "33"), light: alpha(palette.blue[100], "66") },
  // 合并共同祖先内容底色
  "merge.commonContent": { dark: alpha(palette.februaryGray, "14"), light: alpha(palette.blue[100], "26") },
  // 合并区块边框
  "merge.border": { dark: palette.februaryGray, light: palette.blue[200] },
  // 小地图选区底色
  "minimap.selection": { dark: alpha(palette.blue[200], "66"), light: alpha(palette.blue[500], "33") },
  // 小地图搜索底色
  "minimap.search": { dark: alpha(palette.moonYellow, "66"), light: alpha(palette.moonYellow, "99") },
  // 状态栏活动项填充
  "statusBar.activeBackground": { dark: palette.blue[600], light: palette.blue[100] },
  // 状态栏错误填充
  "statusBar.errorBackground": { dark: palette.red[700], light: palette.red[700] },
  // 状态栏错误文字
  "statusBar.errorText": { dark: palette.red[50], light: palette.red[50] },
  // 状态栏警告填充
  "statusBar.warningBackground": { dark: palette.moonYellow, light: palette.moonYellow },
  // 状态栏警告文字
  "statusBar.warningText": { dark: palette.navy, light: palette.blue[700] },
  // 调试焦点栈帧底色
  "debug.focusedFrame": { dark: alpha(palette.green[700], "1A"), light: alpha(palette.green[900], "1A") },
  // ANSI 黑
  "terminal.ansiBlack": { dark: palette.navy, light: palette.blue[900] },
  // ANSI 品红
  "terminal.ansiMagenta": { dark: palette.red[200], light: palette.red[700] },
  // ANSI 白
  "terminal.ansiWhite": { dark: palette.gray, light: palette.blue[800] },
  // ANSI 亮黑
  "terminal.ansiBrightBlack": { dark: palette.februaryGray, light: palette.blue[500] },
  // ANSI 亮红
  "terminal.ansiBrightRed": { dark: palette.red[200], light: palette.red[400] },
  // ANSI 亮品红
  "terminal.ansiBrightMagenta": { dark: palette.red[100], light: palette.red[500] },
  // ANSI 亮白
  "terminal.ansiBrightWhite": { dark: palette.blue[50], light: palette.blue[700] },
  // 引用与代码块背景
  "surface.codeBlock": { dark: palette.navy, light: palette.ice },
  // 输入框与复选框背景
  "surface.input": { dark: palette.navy, light: palette.ice },
  // 输入信息提示背景
  "validation.infoBackground": { dark: palette.blue[700], light: alpha(palette.blue[100], "66") },
  // 侧边栏、标题栏与标签栏背景
  "surface.chrome": { dark: palette.navy, light: palette.ice },
  // 编辑器与终端光标
  "editor.cursor": { dark: palette.blue[100], light: palette.blue[500] },
  // 当前搜索匹配边框
  "search.border": { dark: palette.moonYellow, light: palette.blue[500] },
  // 匹配括号边框
  "bracket.matchBorder": { dark: palette.blue[200], light: palette.blue[500] },
  // 括号第 1 层
  "bracket.1": { dark: palette.blue[200], light: palette.blue[500] },
  // 括号第 2 层
  "bracket.2": { dark: palette.red[200], light: palette.red[500] },
  // 括号第 3 层
  "bracket.3": { dark: palette.moonYellow, light: palette.blue[700] },
  // 括号第 4 层
  "bracket.4": { dark: palette.green[600], light: palette.green[900] },
  // 括号第 5 层
  "bracket.5": { dark: palette.blue[100], light: palette.blue[400] },
  // 括号第 6 层
  "bracket.6": { dark: palette.red[300], light: palette.red[700] },
  // 代码操作灯泡图标
  "editor.lightBulb": { dark: palette.moonYellow, light: palette.blue[500] },
  // 合并当前标题底色
  "merge.currentHeader": { dark: alpha(palette.blue[500], "66"), light: alpha(palette.blue[500], "26") },
  // 调试栈帧底色
  "debug.stackFrame": { dark: alpha(palette.moonYellow, "1A"), light: alpha(palette.moonYellow, "44") },
  // 终端 ansiRed 槽位，保持独立于代码高亮
  "terminal.ansiRed": { dark: palette.red[300], light: palette.red[500] },
  // 终端 ansiGreen 槽位，保持独立于代码高亮
  "terminal.ansiGreen": { dark: palette.green[600], light: palette.green[900] },
  // 终端 ansiYellow 槽位，保持独立于代码高亮
  "terminal.ansiYellow": { dark: palette.moonYellow, light: palette.blue[700] },
  // 终端 ansiBlue 槽位，保持独立于代码高亮
  "terminal.ansiBlue": { dark: palette.blue[300], light: palette.blue[500] },
  // 终端 ansiCyan 槽位，保持独立于代码高亮
  "terminal.ansiCyan": { dark: palette.blue[200], light: palette.blue[400] },
  // 终端 ansiBrightGreen 槽位，保持独立于代码高亮
  "terminal.ansiBrightGreen": { dark: palette.green[500], light: palette.green[900] },
  // 终端 ansiBrightYellow 槽位，保持独立于代码高亮
  "terminal.ansiBrightYellow": { dark: palette.moonYellow, light: palette.blue[700] },
  // 终端 ansiBrightBlue 槽位，保持独立于代码高亮
  "terminal.ansiBrightBlue": { dark: palette.blue[200], light: palette.blue[400] },
  // 终端 ansiBrightCyan 槽位，保持独立于代码高亮
  "terminal.ansiBrightCyan": { dark: palette.blue[100], light: palette.blue[500] },
  // 语法高亮：type，同时用于 TextMate、semantic token 和符号图标
  "syntax.type": { dark: palette.blue[200], light: palette.blue[400] },
  // 语法高亮：function，同时用于 TextMate、semantic token 和符号图标
  "syntax.function": { dark: palette.red[200], light: palette.red[600] },
  // 语法高亮：variable，同时用于 TextMate、semantic token 和符号图标
  "syntax.variable": { dark: palette.gray, light: palette.blue[900] },
  // 语法高亮：property，同时用于 TextMate、semantic token 和符号图标
  "syntax.property": { dark: palette.blue[100], light: palette.blue[600] },
  // 语法高亮：number，同时用于 TextMate、semantic token 和符号图标
  "syntax.number": { dark: palette.moonYellow, light: palette.blue[700] },
  // 语法高亮：string，同时用于 TextMate、semantic token 和符号图标
  "syntax.string": { dark: palette.green[600], light: palette.green[900] },
  // 语法高亮：keyword，同时用于 TextMate、semantic token 和符号图标
  "syntax.keyword": { dark: palette.red[300], light: palette.red[500] },
  // 注释与文档说明
  "syntax.comment": { dark: palette.februaryGray, light: alpha(palette.blue[500], "CC") },
  // 文档标签
  "syntax.documentation": { dark: palette.blue[200], light: palette.blue[400] },
  // 运算符
  "syntax.operator": { dark: palette.blue[100], light: palette.blue[600] },
  // 标点与分隔符
  "syntax.punctuation": { dark: palette.gray, light: palette.blue[900] },
  // 转义字符与格式占位符
  "syntax.escape": { dark: palette.moonYellow, light: palette.blue[700] },
  // 正则表达式
  "syntax.regexp": { dark: palette.green[500], light: palette.green[900] },
  // 正则运算符与分组
  "syntax.regexpOperator": { dark: palette.red[200], light: palette.red[600] },
  // 装饰器与注解
  "syntax.decorator": { dark: palette.moonYellow, light: palette.blue[700] },
  // 标签名称
  "syntax.tag": { dark: palette.red[300], light: palette.red[500] },
  // 标签边界
  "syntax.tagBoundary": { dark: palette.februaryGray, light: alpha(palette.blue[500], "CC") },
  // 属性名称
  "syntax.attribute": { dark: palette.blue[100], light: palette.blue[600] },
  // CSS 选择器
  "syntax.selector": { dark: palette.red[200], light: palette.red[600] },
  // 无效代码
  "syntax.invalid": { dark: palette.red[200], light: palette.red[600] },
  // 已弃用代码
  "syntax.deprecated": { dark: palette.februaryGray, light: alpha(palette.blue[500], "CC") },
  // Markdown 正文
  "syntax.markdownText": { dark: palette.gray, light: palette.blue[900] },
  // Markdown 标题
  "syntax.markdownHeading": { dark: palette.blue[100], light: palette.blue[600] },
  // Markdown 标题与列表标记
  "syntax.markdownMarker": { dark: palette.red[300], light: palette.red[500] },
  // Markdown 行内代码与原始文本
  "syntax.markdownCode": { dark: palette.green[500], light: palette.green[900] },
  // Markdown 代码围栏
  "syntax.markdownFence": { dark: palette.februaryGray, light: alpha(palette.blue[500], "CC") },
  // Markdown 引用
  "syntax.markdownQuote": { dark: palette.februaryGray, light: alpha(palette.blue[500], "CC") },
  // Markdown 链接描述
  "syntax.markdownLinkText": { dark: palette.blue[100], light: palette.blue[600] },
  // 链接目标
  "syntax.link": { dark: palette.blue[200], light: palette.blue[400] },
  // Markdown 强调
  "syntax.markdownBold": { dark: palette.red[200], light: palette.red[600] },
  // 删除线
  "syntax.strikethrough": { dark: palette.februaryGray, light: alpha(palette.blue[500], "CC") },
  // 差异新增
  "syntax.diffAdded": { dark: palette.green[600], light: palette.green[900] },
  // 差异删除
  "syntax.diffDeleted": { dark: palette.red[200], light: palette.red[600] },
  // 差异修改与分隔线
  "syntax.diffChanged": { dark: palette.moonYellow, light: palette.blue[700] },
  // 差异文件头
  "syntax.diffHeader": { dark: palette.blue[200], light: palette.blue[400] },
};

// 每个 VS Code 界面项目都在以下分区中显式归类，不依赖键名猜测或颜色反查。
export const uiSections = [
  {
    name: "基础文字、链接与通用容器",
    colors: {
      "foreground": "text.primary",
      "descriptionForeground": "text.secondary",
      "disabledForeground": "text.secondary",
      "errorForeground": "status.error",
      "focusBorder": "border.focus",
      "contrastBorder": "border.transparent",
      "selection.background": "interaction.accent",
      "widget.border": "border.standard",
      "widget.shadow": "surface.shadow",
      "icon.foreground": "text.accent",
      "textLink.foreground": "text.link",
      "textLink.activeForeground": "text.accent",
      "textBlockQuote.background": "surface.codeBlock",
      "textBlockQuote.border": "border.standard",
      "textCodeBlock.background": "surface.codeBlock",
      "textPreformat.foreground": "text.code",
      "textSeparator.foreground": "border.standard",
    },
  },
  {
    name: "按钮、输入与校验",
    colors: {
      "button.background": "interaction.accent",
      "button.foreground": "text.onAccent",
      "button.hoverBackground": "interaction.accentHover",
      "button.border": "border.focus",
      "button.secondaryBackground": "interaction.secondary",
      "button.secondaryForeground": "text.accent",
      "button.secondaryHoverBackground": "interaction.secondaryHover",
      "checkbox.background": "surface.input",
      "checkbox.foreground": "text.accent",
      "checkbox.border": "border.control",
      "dropdown.background": "surface.input",
      "dropdown.foreground": "text.primary",
      "dropdown.border": "border.control",
      "dropdown.listBackground": "surface.elevated",
      "input.background": "surface.input",
      "input.foreground": "text.primary",
      "input.border": "border.control",
      "input.placeholderForeground": "text.secondary",
      "inputOption.activeBackground": "interaction.accent",
      "inputOption.activeForeground": "text.onAccent",
      "inputOption.activeBorder": "border.focus",
      "inputValidation.errorBackground": "validation.errorBackground",
      "inputValidation.errorForeground": "validation.errorText",
      "inputValidation.errorBorder": "validation.errorBorder",
      "inputValidation.warningBackground": "validation.warningBackground",
      "inputValidation.warningForeground": "validation.warningText",
      "inputValidation.warningBorder": "validation.warningText",
      "inputValidation.infoBackground": "validation.infoBackground",
      "inputValidation.infoForeground": "validation.infoText",
      "inputValidation.infoBorder": "border.focus",
    },
  },
  {
    name: "滚动条、进度与徽标",
    colors: {
      "scrollbar.shadow": "surface.shadow",
      "scrollbarSlider.background": "scrollbar.normal",
      "scrollbarSlider.hoverBackground": "scrollbar.hover",
      "scrollbarSlider.activeBackground": "scrollbar.active",
      "progressBar.background": "interaction.progress",
      "badge.background": "interaction.accent",
      "badge.foreground": "text.onAccent",
    },
  },
  {
    name: "活动栏与侧边栏",
    colors: {
      "activityBar.background": "surface.chrome",
      "activityBar.foreground": "text.accent",
      "activityBar.inactiveForeground": "text.secondary",
      "activityBar.border": "border.subtle",
      "activityBar.activeBorder": "border.active",
      "activityBar.activeBackground": "interaction.tileHover",
      "activityBarBadge.background": "interaction.accent",
      "activityBarBadge.foreground": "text.onAccent",
      "activityBarTop.foreground": "text.accent",
      "activityBarTop.inactiveForeground": "text.secondary",
      "activityBarTop.activeBorder": "border.active",
      "sideBar.background": "surface.chrome",
      "sideBar.foreground": "text.primary",
      "sideBar.border": "border.subtle",
      "sideBarTitle.foreground": "text.accent",
      "sideBarSectionHeader.background": "surface.elevated",
      "sideBarSectionHeader.foreground": "text.accent",
      "sideBarSectionHeader.border": "border.subtle",
    },
  },
  {
    name: "列表、树与拖放",
    colors: {
      "list.activeSelectionBackground": "selection.background",
      "list.activeSelectionForeground": "text.onAccent",
      "list.activeSelectionIconForeground": "text.onAccent",
      "list.inactiveSelectionBackground": "interaction.secondary",
      "list.inactiveSelectionForeground": "text.accent",
      "list.inactiveSelectionIconForeground": "text.accent",
      "list.hoverBackground": "interaction.hover",
      "list.hoverForeground": "text.onHover",
      "list.focusBackground": "interaction.hover",
      "list.focusForeground": "text.onHover",
      "list.focusOutline": "border.focus",
      "list.inactiveFocusOutline": "text.secondary",
      "list.highlightForeground": "text.match",
      "list.focusHighlightForeground": "text.focusMatch",
      "list.errorForeground": "status.error",
      "list.warningForeground": "status.warning",
      "list.deemphasizedForeground": "text.secondary",
      "list.dropBackground": "highlight.strong",
      "tree.indentGuidesStroke": "interaction.accent",
      "tree.inactiveIndentGuidesStroke": "border.subtle",
    },
  },
  {
    name: "标题栏、命令中心与菜单",
    colors: {
      "titleBar.activeBackground": "surface.chrome",
      "titleBar.activeForeground": "text.accent",
      "titleBar.inactiveBackground": "surface.chrome",
      "titleBar.inactiveForeground": "text.secondary",
      "titleBar.border": "border.subtle",
      "commandCenter.background": "surface.elevated",
      "commandCenter.foreground": "text.accent",
      "commandCenter.border": "border.standard",
      "commandCenter.activeBackground": "interaction.hover",
      "commandCenter.activeForeground": "text.onHover",
      "commandCenter.activeBorder": "border.focus",
      "menubar.selectionBackground": "interaction.hover",
      "menubar.selectionForeground": "text.onAccent",
      "menu.background": "surface.elevated",
      "menu.foreground": "text.primary",
      "menu.border": "border.standard",
      "menu.selectionBackground": "selection.background",
      "menu.selectionForeground": "text.onAccent",
      "menu.separatorBackground": "border.separator",
    },
  },
  {
    name: "编辑器分组与标签",
    colors: {
      "editorGroup.border": "border.subtle",
      "editorGroup.dropBackground": "highlight.strong",
      "editorGroupHeader.tabsBackground": "surface.chrome",
      "editorGroupHeader.tabsBorder": "border.subtle",
      "editorGroupHeader.noTabsBackground": "surface.chrome",
      "editorGroup.emptyBackground": "surface.canvas",
      "tab.activeBackground": "surface.canvas",
      "tab.activeForeground": "text.accent",
      "tab.activeBorder": "surface.canvas",
      "tab.activeBorderTop": "border.active",
      "tab.inactiveBackground": "surface.chrome",
      "tab.inactiveForeground": "text.secondary",
      "tab.unfocusedActiveForeground": "text.primary",
      "tab.unfocusedInactiveForeground": "text.secondary",
      "tab.border": "border.subtle",
      "tab.hoverBackground": "interaction.tileHover",
      "tab.hoverForeground": "text.accent",
      "tab.unfocusedHoverBackground": "interaction.tileHover",
      "tab.activeModifiedBorder": "status.modified",
      "tab.inactiveModifiedBorder": "status.modified",
    },
  },
  {
    name: "面包屑",
    colors: {
      "breadcrumb.background": "surface.canvas",
      "breadcrumb.foreground": "text.secondary",
      "breadcrumb.focusForeground": "text.accent",
      "breadcrumb.activeSelectionForeground": "text.onHover",
      "breadcrumbPicker.background": "surface.elevated",
    },
  },
  {
    name: "编辑器、选区、搜索与括号",
    colors: {
      "editor.background": "surface.canvas",
      "editor.foreground": "text.primary",
      "editorCursor.foreground": "editor.cursor",
      "editorCursor.background": "surface.canvas",
      "editorLineNumber.foreground": "text.secondary",
      "editorLineNumber.activeForeground": "text.accent",
      "editor.lineHighlightBackground": "highlight.line",
      "editor.lineHighlightBorder": "border.transparent",
      "editor.selectionBackground": "selection.background",
      "editor.selectionForeground": "text.onAccent",
      "editor.inactiveSelectionBackground": "selection.inactive",
      "editor.selectionHighlightBackground": "highlight.word",
      "editor.selectionHighlightBorder": "border.standard",
      "editor.wordHighlightBackground": "highlight.word",
      "editor.wordHighlightStrongBackground": "highlight.strong",
      "editor.wordHighlightBorder": "border.standard",
      "editor.wordHighlightStrongBorder": "border.focus",
      "editor.findMatchBackground": "search.match",
      "editor.findMatchBorder": "search.border",
      "editor.findMatchHighlightBackground": "search.otherMatch",
      "editor.findMatchHighlightBorder": "search.otherBorder",
      "editor.findRangeHighlightBackground": "highlight.range",
      "editor.rangeHighlightBackground": "highlight.range",
      "editor.hoverHighlightBackground": "highlight.hover",
      "editorLink.activeForeground": "text.accent",
      "editorWhitespace.foreground": "editor.whitespace",
      "editorIndentGuide.background1": "border.subtle",
      "editorIndentGuide.activeBackground1": "border.standard",
      "editorRuler.foreground": "border.subtle",
      "editorBracketMatch.background": "highlight.strong",
      "editorBracketMatch.border": "bracket.matchBorder",
      "editorBracketHighlight.foreground1": "bracket.1",
      "editorBracketHighlight.foreground2": "bracket.2",
      "editorBracketHighlight.foreground3": "bracket.3",
      "editorBracketHighlight.foreground4": "bracket.4",
      "editorBracketHighlight.foreground5": "bracket.5",
      "editorBracketHighlight.foreground6": "bracket.6",
      "editorBracketHighlight.unexpectedBracket.foreground": "status.error",
    },
  },
  {
    name: "行号槽、诊断与内嵌提示",
    colors: {
      "editorGutter.background": "surface.canvas",
      "editorGutter.addedBackground": "status.added",
      "editorGutter.modifiedBackground": "status.modified",
      "editorGutter.deletedBackground": "status.deleted",
      "editorGutter.foldingControlForeground": "text.link",
      "editorError.foreground": "status.error",
      "editorWarning.foreground": "status.warning",
      "editorInfo.foreground": "text.link",
      "editorHint.foreground": "text.secondary",
      "editorUnnecessaryCode.opacity": "editor.unnecessaryOpacity",
      "editorGhostText.foreground": "text.secondary",
      "editorInlayHint.background": "editor.inlayBackground",
      "editorInlayHint.foreground": "text.secondary",
      "editorCodeLens.foreground": "text.secondary",
      "editorLightBulb.foreground": "editor.lightBulb",
      "editorLightBulbAutoFix.foreground": "interaction.progress",
    },
  },
  {
    name: "概览标尺",
    colors: {
      "editorOverviewRuler.border": "border.subtle",
      "editorOverviewRuler.errorForeground": "status.error",
      "editorOverviewRuler.warningForeground": "status.warning",
      "editorOverviewRuler.infoForeground": "text.link",
      "editorOverviewRuler.addedForeground": "status.added",
      "editorOverviewRuler.modifiedForeground": "status.modified",
      "editorOverviewRuler.deletedForeground": "status.deleted",
    },
  },
  {
    name: "编辑器浮层、补全与粘性滚动",
    colors: {
      "editorWidget.background": "surface.elevated",
      "editorWidget.foreground": "text.primary",
      "editorWidget.border": "border.standard",
      "editorWidget.resizeBorder": "border.focus",
      "editorHoverWidget.background": "surface.elevated",
      "editorHoverWidget.foreground": "text.primary",
      "editorHoverWidget.border": "border.standard",
      "editorHoverWidget.statusBarBackground": "surface.elevated",
      "editorSuggestWidget.background": "surface.elevated",
      "editorSuggestWidget.foreground": "text.primary",
      "editorSuggestWidget.border": "border.standard",
      "editorSuggestWidget.highlightForeground": "text.link",
      "editorSuggestWidget.selectedBackground": "selection.background",
      "editorSuggestWidget.selectedForeground": "text.onAccent",
      "editorSuggestWidget.selectedIconForeground": "text.onAccent",
      "editorSuggestWidget.focusHighlightForeground": "text.selectedMatch",
      "editorMarkerNavigation.background": "surface.elevated",
      "editorMarkerNavigationError.background": "status.error",
      "editorMarkerNavigationWarning.background": "status.warning",
      "editorMarkerNavigationInfo.background": "text.link",
      "editorStickyScroll.background": "surface.canvas",
      "editorStickyScroll.border": "border.subtle",
      "editorStickyScroll.shadow": "surface.shadow",
      "editorStickyScrollHover.background": "surface.elevated",
    },
  },
  {
    name: "速览",
    colors: {
      "peekView.border": "border.standard",
      "peekViewEditor.background": "surface.canvas",
      "peekViewEditorGutter.background": "surface.canvas",
      "peekViewEditor.matchHighlightBackground": "search.match",
      "peekViewResult.background": "surface.canvas",
      "peekViewResult.fileForeground": "text.accent",
      "peekViewResult.lineForeground": "text.primary",
      "peekViewResult.matchHighlightBackground": "search.match",
      "peekViewResult.selectionBackground": "selection.background",
      "peekViewResult.selectionForeground": "text.onAccent",
      "peekViewTitle.background": "surface.elevated",
      "peekViewTitleLabel.foreground": "text.accent",
      "peekViewTitleDescription.foreground": "text.link",
    },
  },
  {
    name: "Diff 与合并",
    colors: {
      "diffEditor.insertedTextBackground": "diff.addedText",
      "diffEditor.removedTextBackground": "diff.removedText",
      "diffEditor.insertedLineBackground": "diff.addedLine",
      "diffEditor.removedLineBackground": "diff.removedLine",
      "diffEditor.border": "border.standard",
      "diffEditor.diagonalFill": "border.subtle",
      "diffEditorGutter.insertedLineBackground": "diff.addedText",
      "diffEditorGutter.removedLineBackground": "diff.removedText",
      "merge.currentHeaderBackground": "merge.currentHeader",
      "merge.currentContentBackground": "merge.currentContent",
      "merge.incomingHeaderBackground": "merge.incomingHeader",
      "merge.incomingContentBackground": "merge.incomingContent",
      "merge.commonHeaderBackground": "merge.commonHeader",
      "merge.commonContentBackground": "merge.commonContent",
      "merge.border": "merge.border",
    },
  },
  {
    name: "小地图",
    colors: {
      "minimap.background": "surface.canvas",
      "minimap.selectionHighlight": "minimap.selection",
      "minimap.findMatchHighlight": "minimap.search",
      "minimap.errorHighlight": "status.error",
      "minimap.warningHighlight": "status.warning",
      "minimapGutter.addedBackground": "status.added",
      "minimapGutter.modifiedBackground": "status.modified",
      "minimapGutter.deletedBackground": "status.deleted",
    },
  },
  {
    name: "面板与状态栏",
    colors: {
      "panel.background": "surface.canvas",
      "panel.border": "border.subtle",
      "panelTitle.activeForeground": "text.accent",
      "panelTitle.inactiveForeground": "text.secondary",
      "panelTitle.activeBorder": "border.active",
      "panelSectionHeader.background": "surface.elevated",
      "panelSectionHeader.foreground": "text.accent",
      "panelInput.border": "border.control",
      "statusBar.background": "surface.elevated",
      "statusBar.foreground": "text.accent",
      "statusBar.border": "border.subtle",
      "statusBar.noFolderBackground": "surface.canvas",
      "statusBar.noFolderForeground": "text.accent",
      "statusBar.debuggingBackground": "interaction.accent",
      "statusBar.debuggingForeground": "text.onAccent",
      "statusBarItem.hoverBackground": "interaction.hover",
      "statusBarItem.activeBackground": "statusBar.activeBackground",
      "statusBarItem.focusBorder": "border.active",
      "statusBarItem.prominentBackground": "interaction.accent",
      "statusBarItem.prominentForeground": "text.onAccent",
      "statusBarItem.prominentHoverBackground": "interaction.accentHover",
      "statusBarItem.remoteBackground": "interaction.accent",
      "statusBarItem.remoteForeground": "text.onAccent",
      "statusBarItem.errorBackground": "statusBar.errorBackground",
      "statusBarItem.errorForeground": "statusBar.errorText",
      "statusBarItem.warningBackground": "statusBar.warningBackground",
      "statusBarItem.warningForeground": "statusBar.warningText",
    },
  },
  {
    name: "快速输入与通知",
    colors: {
      "quickInput.background": "surface.elevated",
      "quickInput.foreground": "text.primary",
      "quickInputTitle.background": "surface.canvas",
      "quickInputList.focusBackground": "selection.background",
      "quickInputList.focusForeground": "text.onAccent",
      "quickInputList.focusIconForeground": "text.onAccent",
      "pickerGroup.foreground": "text.link",
      "pickerGroup.border": "border.separator",
      "notificationCenterHeader.background": "surface.canvas",
      "notificationCenterHeader.foreground": "text.accent",
      "notifications.background": "surface.elevated",
      "notifications.foreground": "text.primary",
      "notifications.border": "border.separator",
      "notificationLink.foreground": "text.link",
      "notificationsErrorIcon.foreground": "status.error",
      "notificationsWarningIcon.foreground": "status.warning",
      "notificationsInfoIcon.foreground": "text.link",
    },
  },
  {
    name: "Git 状态",
    colors: {
      "gitDecoration.addedResourceForeground": "status.added",
      "gitDecoration.modifiedResourceForeground": "status.modified",
      "gitDecoration.deletedResourceForeground": "status.error",
      "gitDecoration.renamedResourceForeground": "text.link",
      "gitDecoration.untrackedResourceForeground": "status.added",
      "gitDecoration.ignoredResourceForeground": "text.secondary",
      "gitDecoration.conflictingResourceForeground": "status.error",
      "gitDecoration.submoduleResourceForeground": "text.link",
    },
  },
  {
    name: "调试与测试",
    colors: {
      "debugToolBar.background": "surface.elevated",
      "debugToolBar.border": "border.standard",
      "debugIcon.breakpointForeground": "status.deleted",
      "debugIcon.breakpointDisabledForeground": "text.secondary",
      "debugIcon.startForeground": "status.added",
      "debugIcon.stopForeground": "status.error",
      "debugIcon.pauseForeground": "status.warning",
      "debugIcon.continueForeground": "text.link",
      "debugIcon.stepOverForeground": "text.link",
      "debugIcon.stepIntoForeground": "text.link",
      "debugIcon.stepOutForeground": "text.link",
      "editor.stackFrameHighlightBackground": "debug.stackFrame",
      "editor.focusedStackFrameHighlightBackground": "debug.focusedFrame",
      "testing.iconPassed": "status.added",
      "testing.iconFailed": "status.error",
      "testing.iconErrored": "status.error",
      "testing.iconQueued": "status.warning",
      "testing.iconUnset": "text.secondary",
      "testing.iconSkipped": "text.secondary",
    },
  },
  {
    name: "终端与 ANSI",
    colors: {
      "terminal.background": "surface.canvas",
      "terminal.foreground": "text.primary",
      "terminal.border": "border.subtle",
      "terminal.selectionBackground": "selection.background",
      "terminal.selectionForeground": "text.onAccent",
      "terminal.inactiveSelectionBackground": "selection.inactive",
      "terminalCursor.foreground": "editor.cursor",
      "terminalCursor.background": "surface.canvas",
      "terminal.ansiBlack": "terminal.ansiBlack",
      "terminal.ansiRed": "terminal.ansiRed",
      "terminal.ansiGreen": "terminal.ansiGreen",
      "terminal.ansiYellow": "terminal.ansiYellow",
      "terminal.ansiBlue": "terminal.ansiBlue",
      "terminal.ansiMagenta": "terminal.ansiMagenta",
      "terminal.ansiCyan": "terminal.ansiCyan",
      "terminal.ansiWhite": "terminal.ansiWhite",
      "terminal.ansiBrightBlack": "terminal.ansiBrightBlack",
      "terminal.ansiBrightRed": "terminal.ansiBrightRed",
      "terminal.ansiBrightGreen": "terminal.ansiBrightGreen",
      "terminal.ansiBrightYellow": "terminal.ansiBrightYellow",
      "terminal.ansiBrightBlue": "terminal.ansiBrightBlue",
      "terminal.ansiBrightMagenta": "terminal.ansiBrightMagenta",
      "terminal.ansiBrightCyan": "terminal.ansiBrightCyan",
      "terminal.ansiBrightWhite": "terminal.ansiBrightWhite",
      "terminal.findMatchBackground": "search.match",
      "terminal.findMatchBorder": "search.border",
      "terminal.findMatchHighlightBackground": "search.otherMatch",
      "terminal.findMatchHighlightBorder": "search.otherBorder",
      "terminalOverviewRuler.cursorForeground": "text.accent",
      "terminalOverviewRuler.findMatchForeground": "status.warning",
    },
  },
  {
    name: "欢迎页与设置",
    colors: {
      "welcomePage.background": "surface.canvas",
      "welcomePage.tileBackground": "surface.canvas",
      "welcomePage.tileHoverBackground": "interaction.tileHover",
      "welcomePage.tileBorder": "border.standard",
      "walkThrough.embeddedEditorBackground": "surface.canvas",
      "settings.headerForeground": "text.accent",
      "settings.modifiedItemIndicator": "status.modified",
      "settings.focusedRowBackground": "surface.canvas",
      "settings.rowHoverBackground": "highlight.line",
      "settings.dropdownBackground": "surface.input",
      "settings.dropdownForeground": "text.primary",
      "settings.dropdownBorder": "border.control",
      "settings.textInputBackground": "surface.input",
      "settings.textInputForeground": "text.primary",
      "settings.textInputBorder": "border.control",
      "settings.numberInputBackground": "surface.input",
      "settings.numberInputForeground": "text.primary",
      "settings.numberInputBorder": "border.control",
      "settings.checkboxBackground": "surface.input",
      "settings.checkboxForeground": "text.accent",
      "settings.checkboxBorder": "border.control",
    },
  },
  {
    name: "符号图标",
    colors: {
      "symbolIcon.classForeground": "syntax.type",
      "symbolIcon.interfaceForeground": "syntax.type",
      "symbolIcon.structForeground": "syntax.type",
      "symbolIcon.typeParameterForeground": "syntax.type",
      "symbolIcon.enumeratorForeground": "syntax.type",
      "symbolIcon.functionForeground": "syntax.function",
      "symbolIcon.methodForeground": "syntax.function",
      "symbolIcon.constructorForeground": "syntax.function",
      "symbolIcon.variableForeground": "syntax.variable",
      "symbolIcon.propertyForeground": "syntax.property",
      "symbolIcon.fieldForeground": "syntax.property",
      "symbolIcon.constantForeground": "syntax.number",
      "symbolIcon.enumeratorMemberForeground": "syntax.number",
      "symbolIcon.stringForeground": "syntax.string",
      "symbolIcon.numberForeground": "syntax.number",
      "symbolIcon.keywordForeground": "syntax.keyword",
      "symbolIcon.namespaceForeground": "syntax.type",
    },
  },
];

// 顺序与原主题一致：TextMate 规则的先后顺序会影响匹配优先级。
// 仅字体样式的规则不指定 role，保持继承的前景色。
export const textMateRules = [
  {
    name: "注释与文档说明",
    scope: ["comment", "punctuation.definition.comment"],
    role: "syntax.comment",
    fontStyle: "italic",
  },
  {
    name: "文档标签",
    scope: ["keyword.other.documentation", "storage.type.class.jsdoc", "entity.name.type.instance.jsdoc"],
    role: "syntax.documentation",
    fontStyle: "",
  },
  {
    name: "普通变量与参数",
    scope: ["variable", "variable.parameter"],
    role: "syntax.variable",
  },
  {
    name: "属性与对象键",
    scope: ["variable.other.property", "variable.other.object.property", "support.type.property-name", "meta.object-literal.key", "entity.name.tag.yaml"],
    role: "syntax.property",
  },
  {
    name: "关键字与存储修饰符",
    scope: ["keyword", "storage.type", "storage.modifier"],
    role: "syntax.keyword",
  },
  {
    name: "运算符",
    scope: ["keyword.operator"],
    role: "syntax.operator",
  },
  {
    name: "关键字形式的运算符",
    scope: ["keyword.operator.word", "keyword.operator.expression", "keyword.operator.new", "keyword.operator.delete", "keyword.operator.sizeof", "keyword.operator.typeid", "keyword.operator.instanceof", "keyword.operator.logical.python"],
    role: "syntax.keyword",
  },
  {
    name: "标点与分隔符",
    scope: ["punctuation", "meta.brace"],
    role: "syntax.punctuation",
  },
  {
    name: "函数、方法与构造函数",
    scope: ["entity.name.function", "support.function", "variable.function", "entity.name.function.constructor"],
    role: "syntax.function",
  },
  {
    name: "类型、类与命名空间",
    scope: ["entity.name.type", "entity.name.class", "entity.name.namespace", "entity.name.module", "entity.other.inherited-class", "support.type", "support.class"],
    role: "syntax.type",
  },
  {
    name: "内建类型",
    scope: ["storage.type.primitive", "storage.type.built-in", "support.type.primitive"],
    role: "syntax.type",
  },
  {
    name: "语言内建变量",
    scope: ["variable.language"],
    role: "syntax.keyword",
  },
  {
    name: "数字、常量与枚举成员",
    scope: ["constant.numeric", "constant.language", "constant.character", "constant.other", "support.constant", "variable.other.constant", "variable.other.enummember", "keyword.other.unit"],
    role: "syntax.number",
  },
  {
    name: "字符串",
    scope: ["string", "constant.other.symbol", "constant.other.key"],
    role: "syntax.string",
  },
  {
    name: "字符串边界",
    scope: ["punctuation.definition.string"],
    role: "syntax.string",
  },
  {
    name: "转义字符与格式占位符",
    scope: ["constant.character.escape", "constant.escape", "constant.other.placeholder", "string constant.other.placeholder"],
    role: "syntax.escape",
  },
  {
    name: "模板插值边界",
    scope: ["punctuation.definition.template-expression", "punctuation.section.embedded", "punctuation.section.interpolation"],
    role: "syntax.keyword",
  },
  {
    name: "模板插值表达式",
    scope: ["meta.embedded", "meta.template.expression"],
    role: "syntax.variable",
  },
  {
    name: "正则表达式",
    scope: ["string.regexp"],
    role: "syntax.regexp",
  },
  {
    name: "正则运算符与分组",
    scope: ["keyword.operator.quantifier.regexp", "keyword.operator.or.regexp", "keyword.control.anchor.regexp", "punctuation.definition.group.regexp", "punctuation.definition.character-class.regexp"],
    role: "syntax.regexpOperator",
  },
  {
    name: "装饰器与注解",
    scope: ["meta.decorator", "entity.name.function.decorator", "entity.name.type.annotation", "punctuation.definition.annotation"],
    role: "syntax.decorator",
  },
  {
    name: "标签名称",
    scope: ["entity.name.tag"],
    role: "syntax.tag",
  },
  {
    name: "标签边界",
    scope: ["punctuation.definition.tag"],
    role: "syntax.tagBoundary",
  },
  {
    name: "属性名称",
    scope: ["entity.other.attribute-name"],
    role: "syntax.attribute",
  },
  {
    name: "CSS 选择器",
    scope: ["entity.other.attribute-name.class.css", "entity.other.attribute-name.id.css", "entity.other.attribute-name.class.scss", "entity.other.attribute-name.id.scss", "entity.other.attribute-name.pseudo-class", "entity.other.attribute-name.pseudo-element"],
    role: "syntax.selector",
  },
  {
    name: "CSS 属性与 JSON 键",
    scope: ["support.type.property-name.css", "support.type.property-name.scss", "support.type.property-name.less", "support.type.property-name.json", "support.type.property-name.json.comments", "string.json support.type.property-name"],
    role: "syntax.property",
  },
  {
    name: "CSS 颜色与属性值",
    scope: ["support.constant.property-value", "support.constant.color", "constant.other.color"],
    role: "syntax.number",
  },
  {
    name: "预处理指令",
    scope: ["keyword.control.directive", "punctuation.definition.directive"],
    role: "syntax.keyword",
  },
  {
    name: "无效代码",
    scope: ["invalid", "invalid.illegal"],
    role: "syntax.invalid",
    fontStyle: "underline",
  },
  {
    name: "已弃用代码",
    scope: ["invalid.deprecated"],
    role: "syntax.deprecated",
    fontStyle: "strikethrough",
  },
  {
    name: "Markdown 正文",
    scope: ["text.html.markdown"],
    role: "syntax.markdownText",
  },
  {
    name: "Markdown 标题",
    scope: ["markup.heading", "entity.name.section.markdown"],
    role: "syntax.markdownHeading",
    fontStyle: "bold",
  },
  {
    name: "Markdown 标题与列表标记",
    scope: ["punctuation.definition.heading.markdown", "punctuation.definition.list.begin.markdown", "punctuation.definition.list_item.markdown"],
    role: "syntax.markdownMarker",
  },
  {
    name: "Markdown 行内代码与原始文本",
    scope: ["markup.inline.raw", "markup.raw.block"],
    role: "syntax.markdownCode",
  },
  {
    name: "Markdown 代码围栏",
    scope: ["punctuation.definition.fenced.markdown", "punctuation.definition.raw.markdown", "fenced_code.block.language", "variable.language.fenced.markdown"],
    role: "syntax.markdownFence",
  },
  {
    name: "Markdown 引用",
    scope: ["markup.quote"],
    role: "syntax.markdownQuote",
  },
  {
    name: "Markdown 链接描述",
    scope: ["string.other.link.description", "string.other.link.title"],
    role: "syntax.markdownLinkText",
  },
  {
    name: "链接目标",
    scope: ["markup.underline.link", "string.other.link", "constant.other.reference.link"],
    role: "syntax.link",
    fontStyle: "underline",
  },
  {
    name: "Markdown 强调",
    scope: ["markup.bold"],
    role: "syntax.markdownBold",
    fontStyle: "bold",
  },
  {
    name: "Markdown 斜体",
    scope: ["markup.italic"],
    fontStyle: "italic",
  },
  {
    name: "Markdown 粗斜体",
    scope: ["markup.bold markup.italic", "markup.italic markup.bold"],
    role: "syntax.markdownBold",
    fontStyle: "bold italic",
  },
  {
    name: "删除线",
    scope: ["markup.strikethrough"],
    role: "syntax.strikethrough",
    fontStyle: "strikethrough",
  },
  {
    name: "差异新增",
    scope: ["markup.inserted"],
    role: "syntax.diffAdded",
  },
  {
    name: "差异删除",
    scope: ["markup.deleted"],
    role: "syntax.diffDeleted",
  },
  {
    name: "差异修改与分隔线",
    scope: ["markup.changed", "meta.separator"],
    role: "syntax.diffChanged",
  },
  {
    name: "差异文件头",
    scope: ["meta.diff.header", "meta.diff.range"],
    role: "syntax.diffHeader",
  },
];

// 与 TextMate 及符号图标共用语法角色，防止语义高亮覆盖成另一套配色。
export const semanticRules = {
  "namespace": "syntax.type",
  "type": "syntax.type",
  "class": "syntax.type",
  "enum": "syntax.type",
  "interface": "syntax.type",
  "struct": "syntax.type",
  "typeParameter": "syntax.type",
  "parameter": "syntax.variable",
  "variable": "syntax.variable",
  "property": "syntax.property",
  "enumMember": "syntax.number",
  "function": "syntax.function",
  "method": "syntax.function",
  "macro": "syntax.number",
  "keyword": "syntax.keyword",
  "modifier": "syntax.keyword",
  "comment": {"role": "syntax.comment", "italic": true},
  "string": "syntax.string",
  "number": "syntax.number",
  "regexp": "syntax.regexp",
  "operator": "syntax.operator",
  "decorator": "syntax.decorator",
  "variable.readonly": "syntax.number",
  "property.readonly": "syntax.number",
  "variable.defaultLibrary": "syntax.property",
  "function.defaultLibrary": "syntax.function",
  "method.defaultLibrary": "syntax.function",
  "*.deprecated": {"strikethrough": true},
};

export const themeConfig = { roles, uiSections, textMateRules, semanticRules };
