# 宝宝单词乐园 - 动画效果增强设计

## 概述

为宝宝单词乐园 PWA 应用添加系统性的动画效果，提升交互体验和趣味性。

## 目标

- 让所有交互有即时反馈，提升"手感"
- 卡片切换流畅自然，增强核心体验
- 吉祥物"活"起来，增加趣味性和吸引力

## 技术方案

使用 `framer-motion`（已安装）实现所有动画效果。

---

## 一、反馈动画

### 1.1 按钮点击动画

**适用组件**: NavButtons（上一个/主页/下一个）、CompleteModal 按钮

**效果**:
- 点击时缩放至 0.95
- 背景色轻微变深
- 松开后恢复

**实现**:
```typescript
// 使用 framer-motion 的 whileTap
<motion.button
  whileTap={{ scale: 0.95 }}
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.1 }}
>
```

### 1.2 星星获得动画

**适用组件**: TopBar（星星计数）

**效果**:
- 数字变化时：新数字从下方弹入
- 星星图标：轻微旋转 + 放大闪烁
- 持续时间：300ms

**实现**:
```typescript
// 使用 AnimatePresence + motion.span
<AnimatePresence mode="popLayout">
  <motion.span
    key={stars}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -20, opacity: 0 }}
  />
</AnimatePresence>
```

### 1.3 分类卡片点击动画

**适用组件**: CategoryList

**效果**:
- 点击时：卡片轻微下沉（scale: 0.98）
- 点击后：涟漪效果从点击位置扩散
- 切换时：旧卡片淡出、新卡片淡入

### 1.4 完成弹窗动画

**适用组件**: CompleteModal

**效果**:
- 弹窗：从小到大弹出（scale: 0.8 → 1）
- 背景遮罩：淡入
- 星星图标：旋转 + 闪烁
- 按钮：依次从下方滑入

---

## 二、卡片动画

### 2.1 单词切换动画

**适用组件**: WordCard

**效果**:
- 上一个：卡片向右滑出，新卡片从左侧滑入
- 下一个：卡片向左滑出，新卡片从右侧滑入
- 切换时：轻微淡入淡出

**实现**:
```typescript
<AnimatePresence mode="wait">
  <motion.div
    key={currentWord.id}
    initial={{ opacity: 0, x: direction * 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: direction * -100 }}
    transition={{ duration: 0.3 }}
  />
</AnimatePresence>
```

### 2.2 首次进入动画

**适用组件**: WordCard

**效果**:
- 卡片从下方滑入（y: 50 → 0）
- emoji、文字依次延迟出现
- 持续时间：400ms

### 2.3 播放指示器动画

**适用组件**: PlayIndicator

**效果**:
- 播放时：脉冲效果（scale 周期性变化）
- 英文/中文切换时：颜色过渡
- 声波动画：三条线依次上下波动

---

## 三、吉祥物动画

### 3.1 待机状态动画

**适用组件**: Mascot

**效果**:
- 轻微呼吸效果：scale 在 1.0 ↔ 1.02 之间缓慢变化
- 周期：2-3 秒
- 眼睛偶尔眨眼（可选，需要 SVG 支持）

**实现**:
```typescript
<motion.div
  animate={{
    scale: [1, 1.02, 1],
  }}
  transition={{
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
```

### 3.2 播放时动画

**适用组件**: Mascot

**效果**:
- 英文播放时：轻微点头
- 中文播放时：轻微摇头
- 动画幅度：旋转 ±5°

---

## 实现计划

### 阶段一：反馈动画
1. NavButtons 添加点击动画
2. CompleteModal 添加弹出动画
3. TopBar 星星动画
4. CategoryList 卡片点击动画

### 阶段二：卡片动画
1. WordCard 切换动画
2. WordCard 首次进入动画
3. PlayIndicator 脉冲动画

### 阶段三：吉祥物动画
1. Mascot 待机呼吸动画
2. Mascot 播放配合动画

---

## 文件变更预估

| 文件 | 变更内容 |
|------|---------|
| `src/components/NavButtons/NavButtons.tsx` | 添加 whileTap/whileHover |
| `src/components/CompleteModal/CompleteModal.tsx` | 弹窗进入动画 |
| `src/components/TopBar/TopBar.tsx` | 星星数字动画 |
| `src/components/CategoryList/CategoryList.tsx` | 卡片点击/切换动画 |
| `src/components/WordCard/WordCard.tsx` | 切换/进入动画 |
| `src/components/PlayIndicator/*` | 脉冲/声波动画 |
| `src/components/Mascot/Mascot.tsx` | 呼吸/配合动画 |

---

## 注意事项

- 动画时长控制在 100-400ms，避免让幼儿等待
- 使用 `will-change` 优化性能
- 尊重 `prefers-reduced-motion` 系统设置
- 避免过度动画导致注意力分散
