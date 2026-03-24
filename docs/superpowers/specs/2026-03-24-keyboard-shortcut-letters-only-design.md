# 快捷键改为纯字母 - 设计文档

> 创建日期: 2026-03-24

## 概述

将主题选择的键盘快捷键从"数字+字母"改为纯字母映射，简化快捷键逻辑，使用 QWERTY 键盘顺序的字母键。

## 需求

- 去除数字键 1-0 的快捷键映射
- 使用英文字母作为快捷键
- 按 QWERTY 键盘顺序排列（而非字母表顺序）
- 保持现有架构和 UI 显示不变

## 键盘映射变更

### 当前映射

```
1234567890QWERTYUIOPASDFGHJKLZXCVBNM
```

- 前 10 个分类使用数字键 1-0
- 后续使用字母键 Q-M

### 新映射

```
QWERTYUIOPASDFGHJKLZXCVBNM
```

- 所有 26 个分类使用字母键
- 按 QWERTY 键盘顺序排列

### 映射对照表

| 分类序号 | 当前快捷键 | 新快捷键 |
|---------|-----------|---------|
| 1 | `1` | `Q` |
| 2 | `2` | `W` |
| 3 | `3` | `E` |
| 4 | `4` | `R` |
| 5 | `5` | `T` |
| 6 | `6` | `Y` |
| 7 | `7` | `U` |
| 8 | `8` | `I` |
| 9 | `9` | `O` |
| 10 | `0` | `P` |
| 11 | `Q` | `A` |
| 12 | `W` | `S` |
| ... | ... | ... |

## 技术方案

### 修改文件

**src/hooks/useKeyboardShortcuts.ts**

```typescript
// 修改前
const SHORTCUT_KEYS = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';

// 修改后
const SHORTCUT_KEYS = 'QWERTYUIOPASDFGHJKLZXCVBNM';
```

### 事件处理

现有的按键检测逻辑无需修改，已支持字母键：

```typescript
// 处理字母键（KeyQ, KeyW, etc.）
if (e.code.startsWith('Key')) {
  key = e.code.replace('Key', '');
}
```

## 边界情况

| 场景 | 处理方式 |
|------|---------|
| 分类数量超过 26 个 | 不分配快捷键，保持点击选择 |
| 数字键按下 | 不再响应分类选择 |

## 文件变更

| 文件 | 变更 |
|------|------|
| `src/hooks/useKeyboardShortcuts.ts` | 修改 SHORTCUT_KEYS 常量 |
