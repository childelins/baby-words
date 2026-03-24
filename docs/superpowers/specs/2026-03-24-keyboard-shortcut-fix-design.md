# 数字键快捷键修复与角标优化设计文档

> Created: 2026-03-24
> Status: Draft

## 概述

修复主题选择的数字键快捷键不生效问题，同时优化角标样式使其更小、更不显眼。

## 问题分析

### 数字键不生效问题

经过代码分析，发现以下情况：

1. **代码逻辑一致性**：`useKeyboardShortcuts.ts` 中数字键和字母键处理逻辑完全相同
2. **字母键正常**：用户确认字母键（Q、W、E 等）可以正常工作
3. **潜在根因**：
   - 浏览器可能在某些场景下对数字键有特殊处理
   - 可能是事件触发的时序问题（categories 加载时机）
   - 需要添加调试日志确认事件是否被正确捕获

### 建议方案

1. **添加调试支持**：在事件处理中添加 console.log 确认按键事件
2. **优化事件处理**：确保 shortcutMap 在事件触发时已正确生成
3. **备用方案**：如果原生 keydown 无法捕获数字键，考虑使用 code 属性

### 角标样式

当前样式：`text-[10px] font-bold text-white bg-black/40`

用户期望：明显缩小，只保留很淡的提示

## 解决方案

### 1. 数字键修复

修改 `src/hooks/useKeyboardShortcuts.ts`：

```typescript
const handleKeyDown = (e: KeyboardEvent) => {
  // 使用 code 属性检测按键，更可靠
  // 数字键: Digit1-Digit0, Numpad1-Numpad0
  // 字母键: KeyQ, KeyW, etc.

  let key = '';

  // 处理数字键（主键盘）
  if (e.code.startsWith('Digit')) {
    key = e.code.replace('Digit', '');
  }
  // 处理数字键（小键盘）
  else if (e.code.startsWith('Numpad')) {
    key = e.code.replace('Numpad', '');
  }
  // 处理字母键
  else if (e.code.startsWith('Key')) {
    key = e.code.replace('Key', '');
  }
  // 其他按键
  else {
    key = e.key.toUpperCase();
  }

  const categoryId = shortcutMap[key];
  // ... 后续处理
};
```

### 2. 角标样式优化

修改 `src/components/CategoryList/CategoryList.tsx`：

**当前样式**：
```tsx
<span className="absolute top-1 right-1 text-[10px] font-bold text-white bg-black/40 px-1.5 py-0.5 rounded">
  {shortcutKey}
</span>
```

**优化后样式**：
```tsx
<span className="absolute top-0.5 right-0.5 text-[8px] font-medium text-white/60 bg-black/20 px-1 py-0.5 rounded">
  {shortcutKey}
</span>
```

变更说明：
- 字体：10px -> 8px（缩小 20%）
- 字重：font-bold -> font-medium（减轻视觉重量）
- 文字透明度：text-white -> text-white/60（更淡）
- 背景透明度：bg-black/40 -> bg-black/20（更淡）
- 内边距：px-1.5 -> px-1（略微收紧）
- 位置：top-1 right-1 -> top-0.5 right-0.5（更靠近角落）

## 组件修改

### useKeyboardShortcuts.ts

```typescript
import { useEffect, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';

// 快捷键映射字符串：数字 1-0 + 字母 Q-M（按键盘顺序）
const SHORTCUT_KEYS = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';

export function useKeyboardShortcuts() {
  const {
    categories,
    selectCategory,
    isPlaying,
    stopAudio,
    showCompleteModal,
    closeCompleteModal,
  } = useGameStore();

  // 生成快捷键到分类 ID 的映射
  const getShortcutMap = useCallback(() => {
    const map: Record<string, string> = {};
    categories.forEach((cat, index) => {
      if (index < SHORTCUT_KEYS.length) {
        map[SHORTCUT_KEYS[index]] = cat.id;
      }
    });
    return map;
  }, [categories]);

  useEffect(() => {
    const shortcutMap = getShortcutMap();

    const handleKeyDown = (e: KeyboardEvent) => {
      let key = '';

      // 处理数字键（主键盘 Digit1-Digit0）
      if (e.code.startsWith('Digit')) {
        key = e.code.replace('Digit', '');
      }
      // 处理数字键（小键盘 Numpad1-Numpad0）
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

      // 检查是否是快捷键
      const categoryId = shortcutMap[key];
      if (categoryId) {
        e.preventDefault();

        // 如果正在播放音频，先停止
        if (isPlaying) {
          stopAudio();
        }

        // 如果完成弹窗打开，先关闭
        if (showCompleteModal) {
          closeCompleteModal();
        }

        selectCategory(categoryId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [getShortcutMap, selectCategory, isPlaying, stopAudio, showCompleteModal, closeCompleteModal]);
}

// 导出快捷键字符串供其他组件使用
export { SHORTCUT_KEYS };
```

### CategoryList.tsx 角标部分

```tsx
{/* 快捷键角标 - 右上角，缩小变淡 */}
{shortcutKey && (
  <span className="absolute top-0.5 right-0.5 text-[8px] font-medium text-white/60 bg-black/20 px-1 py-0.5 rounded">
    {shortcutKey}
  </span>
)}
```

## 测试策略

1. **数字键测试**：
   - 在首页按 1-9 和 0 键，验证是否能选择对应分类
   - 在游戏页面按数字键，验证是否能切换分类
   - 测试主键盘和小键盘数字键

2. **字母键测试**：
   - 验证字母键仍然正常工作
   - 验证 Q、W、E 等按键

3. **角标样式测试**：
   - 验证角标变小变淡
   - 验证可读性仍然足够
   - 验证在不同主题色背景上的显示效果

## 实现注意事项

1. **事件处理优先级**：使用 `e.code` 比使用 `e.key` 更可靠，因为它代表物理按键位置，不受键盘布局影响

2. **小键盘支持**：同时支持主键盘和小键盘数字键，提升用户体验

3. **角标可读性**：虽然角标变淡，但仍需保证用户能看清快捷键提示

4. **向后兼容**：保留字母键的原有处理方式，确保不影响现有功能
