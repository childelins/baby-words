# 键盘快捷键修复与角标优化 实现计划

> **For agentic workers:** REQUIRED SKILL: Use planning-with-files to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复数字键快捷键不生效问题，优化角标样式使其更小更淡

**Architecture:** 使用 `e.code` 属性检测物理按键位置替代 `e.key`，同时支持主键盘和小键盘数字键；角标样式从 10px 缩小到 8px，透明度降低

**Tech Stack:** React, TypeScript, Tailwind CSS

---

## 文件结构

| 文件 | 操作 | 职责 |
|------|------|------|
| `src/hooks/useKeyboardShortcuts.ts` | 修改 | 修复数字键检测逻辑 |
| `src/components/CategoryList/CategoryList.tsx` | 修改 | 优化角标样式 |

---

### Task 1: 修复数字键快捷键检测

**Files:**
- Modify: `src/hooks/useKeyboardShortcuts.ts:31-32`

- [ ] **Step 1: 修改 handleKeyDown 函数，使用 e.code 检测按键**

将第 31-32 行：
```typescript
const handleKeyDown = (e: KeyboardEvent) => {
  const key = e.key.toUpperCase();
```

替换为：
```typescript
const handleKeyDown = (e: KeyboardEvent) => {
  let key = '';

  // 处理数字键（主键盘 Digit1-Digit0）
  if (e.code.startsWith('Digit')) {
    key = e.code.replace('Digit', '');
  }
  // 处理数字键（小键盘 Numpad1-Numpad0，排除小数点）
  else if (e.code.startsWith('Numpad') && e.code !== 'NumpadDecimal') {
    key = e.code.replace('Numpad', '');
  }
  // 处理字母键（KeyQ, KeyW, etc.）
  else if (e.code.startsWith('Key')) {
    key = e.code.replace('Key', '');
  }
  // 其他按键使用 key 属性
  else {
    key = e.key.toUpperCase();
  }
```

- [ ] **Step 2: 验证修改**

运行开发服务器测试数字键和字母键是否都能正常工作：
```bash
npm run dev
```

手动测试：
- 首页按 1-9、0 键选择主题
- 首页按 Q、W、E 等字母键选择主题
- 游戏页面测试同样操作
- 测试小键盘数字键

- [ ] **Step 3: 提交修改**

```bash
git add src/hooks/useKeyboardShortcuts.ts
git commit -m "fix(keyboard): 使用 e.code 检测按键修复数字键不生效问题

- 使用 e.code 替代 e.key 检测物理按键位置
- 同时支持主键盘和小键盘数字键
- 字母键保持原有逻辑兼容"
```

---

### Task 2: 优化角标样式

**Files:**
- Modify: `src/components/CategoryList/CategoryList.tsx:71-75`

- [ ] **Step 1: 修改角标样式**

将第 71-75 行：
```tsx
{/* 快捷键角标 - 右上角 */}
{shortcutKey && (
  <span className="absolute top-1 right-1 text-[10px] font-bold text-white bg-black/40 px-1.5 py-0.5 rounded">
    {shortcutKey}
  </span>
)}
```

替换为：
```tsx
{/* 快捷键角标 - 右上角，缩小变淡 */}
{shortcutKey && (
  <span className="absolute top-0.5 right-0.5 text-[8px] font-medium text-white/60 bg-black/20 px-1 py-0.5 rounded">
    {shortcutKey}
  </span>
)}
```

样式变更说明：
- 字体：`text-[10px]` → `text-[8px]`（缩小 20%）
- 字重：`font-bold` → `font-medium`
- 文字颜色：`text-white` → `text-white/60`（60% 透明度）
- 背景：`bg-black/40` → `bg-black/20`（更淡）
- 内边距：`px-1.5` → `px-1`
- 位置：`top-1 right-1` → `top-0.5 right-0.5`

- [ ] **Step 2: 验证样式效果**

检查角标在不同主题色背景上的显示效果，确保可读性

- [ ] **Step 3: 提交修改**

```bash
git add src/components/CategoryList/CategoryList.tsx
git commit -m "style: 优化快捷键角标样式，缩小变淡

- 字体从 10px 缩小到 8px
- 文字透明度降至 60%
- 背景透明度降至 20%"
```

---

## 测试清单

- [ ] 首页按数字键 1-9、0 可正常选择前 10 个主题
- [ ] 首页按字母键 Q、W、E 等可正常选择主题
- [ ] 游戏页面数字键和字母键都能正常切换主题
- [ ] 小键盘数字键也能工作
- [ ] 角标明显变小变淡，但仍可阅读
- [ ] 角标在各主题色背景上显示正常
