# NavButtons 缩小 + 配色统一 + ProgressBar 溢出修复 Implementation Plan

> **For agentic workers:** REQUIRED SKILL: Use planning-with-files to implement this plan task-by-task.

**Goal:** 缩小导航按钮尺寸、统一配色风格，修复 ProgressBar 底部溢出被截断问题。

**Architecture:** 纯 UI 调整，修改 NavButtons 组件样式和 GamePage 布局结构。

**Tech Stack:** React, Tailwind CSS, Framer Motion

---

### Task 1: NavButtons 紧凑化 + 配色统一

**Files:**
- Modify: `src/components/NavButtons/NavButtons.tsx`

**Spec:** docs/superpowers/specs/2026-03-24-nav-buttons-progressbar-fix-design.md § 1-2

**变更要点:**

1. 去掉大 emoji（⬅️🏠➡️🎉），仅保留文字标签 + 快捷键提示
2. 尺寸从 `w-[100px] h-[120px]` / `w-[120px] h-[120px]` 缩至 `px-5 py-2.5`（内容自适应）
3. 圆角从 `rounded-3xl` 改为 `rounded-xl`
4. 三个按钮统一 `bg-theme-bg-card` 底色 + `text-theme-text-secondary` 文字
5. 主页按钮用 `bg-mascot-100` 略微区分
6. 快捷键提示用 `text-theme-text-muted text-xs`
7. 禁用态保持 `opacity-50 cursor-not-allowed`
8. 完成态（最后一词）：文字变"完成"，底色 `bg-mascot-100`，不再用 `bg-mascot-500`
9. gap 从 `gap-6` 缩至 `gap-3`

- [ ] Step 1: 修改 NavButtons.tsx，应用上述所有变更
- [ ] Step 2: 运行 `npm run build` 验证编译通过
- [ ] Step 3: 提交

---

### Task 2: GamePage 布局修复（ProgressBar 溢出）

**Files:**
- Modify: `src/pages/GamePage.tsx`

**Spec:** docs/superpowers/specs/2026-03-24-nav-buttons-progressbar-fix-design.md § 3

**变更要点:**

1. 外层 div: `min-h-screen` → `h-screen overflow-hidden`
2. 内层 z-10 div: `min-h-screen` → `h-full`
3. 主内容区（flex-1）: 添加 `min-h-0 overflow-auto`，确保内容可滚动但 ProgressBar 始终在视口内

- [ ] Step 1: 修改 GamePage.tsx 布局类名
- [ ] Step 2: 运行 `npm run build` 验证编译通过
- [ ] Step 3: 提交
