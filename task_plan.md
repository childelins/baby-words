# 宝宝单词乐园 - 夜间模式任务计划

## 项目概述

为宝宝单词乐园添加夜间切换模式，采用柔和暗色风格，手动按钮切换，保持吉祥物主题色作为点缀。

**技术栈**: React 18 + TypeScript + Tailwind CSS + CSS Variables + localStorage

---

## 阶段一：CSS 变量系统 ✅ 已完成

- [x] Task 1.1: 在 `index.css` 添加日间模式 CSS 变量
- [x] Task 1.2: 添加夜间模式 CSS 变量
- [x] Task 1.3: 更新 Tailwind 配置添加主题色
- [x] Task 1.4: 验证构建
- [x] Task 1.5: 提交 CSS 变量系统

#### Phase 1 Quality Gate
- [x] Build verification: `npm run build` passes
- [x] Spec compliance: CSS 变量定义正确
- [x] Code quality: No magic numbers, functions < 80 lines

---

## 阶段二：主题 Hook ✅ 已完成

- [x] Task 2.1: 创建 `useTheme.ts` Hook
- [x] Task 2.2: 更新 `hooks/index.ts` 导出
- [x] Task 2.3: 验证构建
- [x] Task 2.4: 提交主题 Hook

#### Phase 2 Quality Gate
- [x] Build verification: `npm run build` passes
- [x] Spec compliance: Hook 实现符合设计
- [x] Code quality: No magic numbers, functions < 80 lines

---

## 阶段三：切换按钮与页面适配 ✅ 已完成

- [x] Task 3.1: TopBar 添加切换按钮
- [x] Task 3.2: 验证构建
- [x] Task 3.3: 提交切换按钮
- [x] Task 3.4: 修改 HomePage 背景
- [x] Task 3.5: 修改 GamePage 背景
- [x] Task 3.6: 验证构建
- [x] Task 3.7: 提交页面背景适配

#### Phase 3 Quality Gate
- [x] Build verification: `npm run build` passes
- [x] Spec compliance: 切换按钮和页面背景正确适配
- [x] Code quality: No magic numbers, functions < 80 lines

---

## 阶段四：组件适配与验证 ✅ 已完成

- [x] Task 4.1: 修改 CategoryList 组件
- [x] Task 4.2: 修改 WordCard 组件
- [x] Task 4.3: 修改 MascotSelector 组件
- [x] Task 4.4: 修改 ProgressBar 组件
- [x] Task 4.5: 修改 CompleteModal 组件
- [x] Task 4.6: 验证构建
- [x] Task 4.7: 提交组件适配
- [x] Task 4.8: 功能验证清单
- [x] Task 4.9: 最终提交

#### Phase 4 Quality Gate
- [x] Build verification: `npm run build` passes
- [x] Spec compliance: 所有组件正确适配夜间模式
- [x] Code quality: No magic numbers, functions < 80 lines
- [x] Log review results in progress.md

---

## 关键决策记录

| 日期 | 决策 | 原因 |
|------|------|------|
| 2026-03-23 | 扩展现有 data-mascot 机制 | 保持吉祥物主题色一致性 |
| 2026-03-23 | 手动切换按钮 | 用户主动控制 |
| 2026-03-23 | 柔和暗色风格 | 适合幼儿使用 |

---

## 阶段五：键盘快捷键修复与角标优化

- **Source**: Plan → docs/superpowers/plans/2026-03-24-keyboard-shortcut-fix-implementation.md
- **Status**: complete
- **Description**: 修复数字键快捷键不生效问题，优化角标样式使其更小更淡

### Task 5.1: 修复数字键快捷键检测
- **Status**: complete (4fbf0e3)
- **File**: `src/hooks/useKeyboardShortcuts.ts`
- **变更**: 使用 e.code 检测按键替代 e.key，同时支持主键盘和小键盘数字键

### Task 5.2: 优化角标样式
- **Status**: complete (2551cbb)
- **File**: `src/components/CategoryList/CategoryList.tsx`
- **变更**: 字体从 10px 缩小到 8px，透明度降低

---

---

## 阶段六：快捷键改为纯字母

- **Source**: Plan → docs/superpowers/plans/2026-03-24-keyboard-shortcut-letters-only-implementation.md
- **Status**: pending
- **Description**: 将主题选择快捷键从"数字+字母"改为纯字母映射（QWERTY顺序）

### Task 6.1: 修改快捷键映射常量
- **Status**: pending
- **File**: `src/hooks/useKeyboardShortcuts.ts`
- **变更**: SHORTCUT_KEYS 从 '1234567890QWERTYUIOPASDFGHJKLZXCVBNM' 改为 'QWERTYUIOPASDFGHJKLZXCVBNM'

### Task 6.2: 验证功能
- **Status**: pending
- **验证内容**:
  - 字母键 Q、W、E 等能选择对应分类
  - 数字键 1-9、0 不再响应

---

## 遇到的错误

| 错误 | 尝试次数 | 解决方案 |
|------|---------|---------|
