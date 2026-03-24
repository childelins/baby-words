# 键盘快捷键选择主题 - 设计文档

> 创建日期: 2026-03-24

## 概述

为分类选择添加键盘快捷键支持，让宝宝可以通过数字键（1-0）和字母键（Q-M）快速选择主题，无需鼠标点击。

## 需求

- 支持数字键 1-0 对应前 10 个分类
- 支持字母键 Q、W、E、R... 对应第 11 个及以后的分类
- 在分类按钮上显示快捷键提示角标
- 首页和游戏页都支持快捷键选择

## 键盘映射规则

| 分类序号 | 快捷键 | 说明 |
|---------|--------|------|
| 1 | `1` | 数字键 |
| 2 | `2` | |
| ... | ... | |
| 10 | `0` | 数字键 0 |
| 11 | `Q` | 字母键开始 |
| 12 | `W` | |
| 13 | `E` | |
| 14 | `R` | |
| 15 | `T` | |
| 16 | `Y` | |
| 17 | `U` | |
| 18 | `I` | |
| 19 | `O` | |
| 20 | `P` | |
| 21 | `A` | 第二排字母开始 |
| ... | ... | 依此类推 |

映射字符串：`1234567890QWERTYUIOPASDFGHJKLZXCVBNM`（最多 36 个分类）

## 视觉设计

在 `CategoryList` 每个分类按钮右上角显示小角标：
- 位置：右上角，距边缘 4px
- 样式：10px 字号，白色文字，半透明深色背景，圆角
- 使用主题变量适配暗色模式
- 不遮挡主题图标和名称

```
┌─────────────┐
│       [1]   │  ← 快捷键角标
│    🐾       │
│  动物世界   │
└─────────────┘
```

## 技术方案

### 架构决策

**选择方案：创建独立 Hook `useKeyboardShortcuts`**

理由：
- 现有 `useAutoPlay.ts` 只在 GamePage 使用，且有 `if (!currentCategory) return;` 判断，首页不响应
- 快捷键选择分类是全局功能，应在 App 级别使用
- 保持关注点分离，`useAutoPlay` 专注于自动播放和游戏页导航

### 实现细节

**1. 新建 Hook：`src/hooks/useKeyboardShortcuts.ts`**

```typescript
import { useEffect, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';

// 快捷键映射字符串
const SHORTCUT_KEYS = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';

export function useKeyboardShortcuts() {
  const { categories, selectCategory, isPlaying, stopAudio, showCompleteModal, closeCompleteModal } = useGameStore();

  // 生成快捷键映射
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
      const key = e.key.toUpperCase();

      // 快捷键选择分类
      if (shortcutMap[key]) {
        e.preventDefault();

        // 如果正在播放音频，先停止
        if (isPlaying) {
          stopAudio();
        }

        // 如果完成弹窗打开，先关闭
        if (showCompleteModal) {
          closeCompleteModal();
        }

        selectCategory(shortcutMap[key]);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [getShortcutMap, selectCategory, isPlaying, stopAudio, showCompleteModal, closeCompleteModal]);
}
```

**2. 在 `App.tsx` 中使用**

```typescript
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  useKeyboardShortcuts();
  // ...
}
```

**3. 修改 `CategoryList.tsx` 显示角标**

- 接收或计算每个分类的快捷键
- 在按钮右上角渲染角标

**4. 导出 Hook**

在 `src/hooks/index.ts` 中添加导出。

## 文件变更

| 文件 | 变更 |
|------|------|
| `src/hooks/useKeyboardShortcuts.ts` | **新建** - 快捷键监听 hook |
| `src/hooks/index.ts` | 添加导出 |
| `src/App.tsx` | 引入 useKeyboardShortcuts hook |
| `src/components/CategoryList/CategoryList.tsx` | 显示快捷键角标 |

## 边界情况

| 场景 | 处理方式 |
|------|---------|
| 分类数量超过快捷键数量 | 不分配快捷键，保持点击选择 |
| 完成弹窗打开时按快捷键 | 先关闭弹窗，再切换分类 |
| 音频播放中按快捷键 | 先停止音频，再切换分类 |
| 游戏页切换其他分类 | 切换到新分类，重置到第一个单词（selectCategory 已实现） |
| 暗色主题适配 | 角标使用主题变量 |
| Space 键 | 保留给播放功能，不在快捷键映射中 |
| Escape 键 | 保留给返回主页/关闭弹窗（在 useAutoPlay 中处理） |
| ArrowLeft/Right | 保留给上/下一个单词（在 useAutoPlay 中处理） |
| 大小写输入 | 统一转大写匹配，大小写都生效 |

## 按键优先级

```
快捷键选择分类 → Space(播放) → ArrowLeft/Right(导航) → Escape(返回)
```

由于 `useKeyboardShortcuts` 和 `useAutoPlay` 都监听 window keydown 事件，事件会按注册顺序触发。在 `App.tsx` 中：
- `useKeyboardShortcuts` 先注册（App 组件）
- `useAutoPlay` 后注册（GamePage 组件，条件渲染）

快捷键命中时 `e.preventDefault()` 可阻止后续监听器响应。
