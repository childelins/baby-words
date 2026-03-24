# NavButtons 缩小 + 配色统一 + ProgressBar 溢出修复

> **For agentic workers:** REQUIRED SKILL: Use planning-with-files to implement this plan task-by-task.

## 背景

GamePage 中导航按钮（上一个/主页/下一个）尺寸过大（100x120 / 120x120），三个按钮配色各不相同（bg-card / mascot-600 / success），视觉不统一。同时 ProgressBar 因布局溢出被截断在视口底部外，只能看到一半。

## 变更

### 1. NavButtons 紧凑化

**当前**: `w-[100px] h-[120px]` / `w-[120px] h-[120px]`，含大 emoji（⬅️🏠➡️）

**目标**:
- 去掉大 emoji，仅保留文字标签 + 快捷键提示
- 尺寸缩至约 `px-5 py-2.5`（自适应内容宽度，高度约 48px）
- 圆角从 `rounded-3xl` 缩至 `rounded-xl`

### 2. NavButtons 配色统一

**当前**: 上一个 `bg-theme-bg-card`、主页 `bg-mascot-600`、下一个 `bg-success`

**目标**:
- 三个按钮统一使用 `bg-theme-bg-card` 底色
- 文字统一使用 `text-theme-text-secondary`，快捷键提示用 `text-theme-text-muted`
- 主页按钮用 `bg-mascot-100` 底色略微区分（hover 态其他按钮也可用 `hover:bg-mascot-50`）
- 禁用态保持 `opacity-50 cursor-not-allowed`
- "下一个"最后一个词时（完成状态）：文字变为"完成"，底色可用 `bg-mascot-100` 突出，不再用 `bg-mascot-500`

### 3. ProgressBar 溢出修复

**当前**: GamePage 内层 div 使用 `min-h-screen flex flex-col`，当内容总高度超过视口时底部 ProgressBar 被截断。

**修复**:
- 外层改为 `h-screen overflow-hidden`（固定视口高度）
- 主内容区改为 `flex-1 min-h-0 overflow-auto`（允许内部滚动）
- ProgressBar 包裹层保持 `py-5`，始终固定在视口底部

## 影响范围

| 文件 | 变更 |
|------|------|
| `src/components/NavButtons/NavButtons.tsx` | 尺寸、emoji、配色 |
| `src/pages/GamePage.tsx` | 布局修复（h-screen + overflow） |

## 不改动

- ProgressBar 组件本身不变
- HomePage 布局不变（需单独确认是否有同样溢出问题）
- TopBar、WordCard、Mascot、CategoryList 不变
