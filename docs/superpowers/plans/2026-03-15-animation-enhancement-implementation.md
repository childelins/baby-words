# 动画效果增强实现计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为宝宝单词乐园添加系统性动画效果，提升交互体验和趣味性

**Architecture:** 分三个阶段实现：反馈动画 → 卡片动画 → 吉祥物动画，每个阶段完成后可独立验证

**Tech Stack:** React 18, TypeScript, Framer Motion, Zustand

---

## Chunk 1: 反馈动画

### Task 1: TopBar 星星动画

**Files:**
- Modify: `src/components/TopBar/TopBar.tsx`

**说明:** 当前星星数字是静态显示，需要添加数字变化时的弹入动画。

- [ ] **Step 1: 添加 framer-motion 导入和 AnimatePresence**

在 TopBar.tsx 顶部添加导入：
```typescript
import { motion, AnimatePresence } from 'framer-motion';
```

- [ ] **Step 2: 添加星星数字动画**

将星星数字部分改为动画版本：
```typescript
{/* 星星数量 */}
<div className="flex items-center gap-2">
  <motion.div
    className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center"
    animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
    transition={{ duration: 0.4, repeat: 0 }}
    key={progress.stars}
  >
    <span className="text-2xl">⭐</span>
  </motion.div>
  <AnimatePresence mode="popLayout">
    <motion.span
      key={progress.stars}
      initial={{ y: 20, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -20, opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="text-2xl font-extrabold text-primary-600"
    >
      {progress.stars}
    </motion.span>
  </AnimatePresence>
</div>
```

- [ ] **Step 3: 验证动画效果**

运行开发服务器，点击下一个单词获得星星，观察数字变化动画。

Run: `npm run dev`

- [ ] **Step 4: 提交更改**

```bash
git add src/components/TopBar/TopBar.tsx
git commit -m "feat(animation): TopBar 星星数字变化动画"
```

---

### Task 2: WordCard 播放指示器脉冲动画

**Files:**
- Modify: `src/components/WordCard/WordCard.tsx`

**说明:** 当前播放指示器只有颜色变化，需要添加脉冲效果和声波动画。

- [ ] **Step 1: 为播放指示器容器添加脉冲动画**

将播放指示器部分的两个语言标签改为 motion.div 并添加脉冲效果：
```typescript
{/* 播放指示器 */}
<div className="flex items-center gap-3">
  <motion.div
    className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors ${
      isPlaying && playingLang === 'en'
        ? 'bg-primary-600'
        : 'bg-primary-100'
    }`}
    animate={isPlaying && playingLang === 'en' ? {
      scale: [1, 1.05, 1],
    } : {}}
    transition={{
      duration: 0.6,
      repeat: isPlaying && playingLang === 'en' ? Infinity : 0,
      ease: 'easeInOut',
    }}
  >
    <span className="text-lg">🔊</span>
    <span className={`text-sm font-semibold ${
      isPlaying && playingLang === 'en' ? 'text-white' : 'text-primary-600'
    }`}>
      English
    </span>
  </motion.div>

  <span className="text-primary-600 text-lg">→</span>

  <motion.div
    className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors ${
      isPlaying && playingLang === 'zh'
        ? 'bg-pink-500'
        : 'bg-pink-100'
    }`}
    animate={isPlaying && playingLang === 'zh' ? {
      scale: [1, 1.05, 1],
    } : {}}
    transition={{
      duration: 0.6,
      repeat: isPlaying && playingLang === 'zh' ? Infinity : 0,
      ease: 'easeInOut',
    }}
  >
    <span className="text-lg">🔊</span>
    <span className={`text-sm font-semibold ${
      isPlaying && playingLang === 'zh' ? 'text-white' : 'text-pink-600'
    }`}>
      中文
    </span>
  </motion.div>
</div>
```

- [ ] **Step 2: 添加声波动画组件**

在文件顶部添加声波动画组件：
```typescript
// 声波动画组件
function SoundWave({ isActive, color }: { isActive: boolean; color: string }) {
  return (
    <div className="flex items-center gap-0.5 h-4">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`w-1 rounded-full ${color}`}
          animate={isActive ? {
            height: [8, 16, 8],
          } : { height: 8 }}
          transition={{
            duration: 0.4,
            repeat: isActive ? Infinity : 0,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
          style={{ height: 8 }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: 将声波动画集成到播放指示器**

更新播放指示器，用声波替换 emoji：
```typescript
{/* 播放指示器 */}
<div className="flex items-center gap-3">
  <motion.div
    className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors ${
      isPlaying && playingLang === 'en'
        ? 'bg-primary-600'
        : 'bg-primary-100'
    }`}
    animate={isPlaying && playingLang === 'en' ? {
      scale: [1, 1.05, 1],
    } : {}}
    transition={{
      duration: 0.6,
      repeat: isPlaying && playingLang === 'en' ? Infinity : 0,
      ease: 'easeInOut',
    }}
  >
    <SoundWave
      isActive={isPlaying && playingLang === 'en'}
      color={isPlaying && playingLang === 'en' ? 'bg-white' : 'bg-primary-500'}
    />
    <span className={`text-sm font-semibold ${
      isPlaying && playingLang === 'en' ? 'text-white' : 'text-primary-600'
    }`}>
      English
    </span>
  </motion.div>

  <span className="text-primary-600 text-lg">→</span>

  <motion.div
    className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors ${
      isPlaying && playingLang === 'zh'
        ? 'bg-pink-500'
        : 'bg-pink-100'
    }`}
    animate={isPlaying && playingLang === 'zh' ? {
      scale: [1, 1.05, 1],
    } : {}}
    transition={{
      duration: 0.6,
      repeat: isPlaying && playingLang === 'zh' ? Infinity : 0,
      ease: 'easeInOut',
    }}
  >
    <SoundWave
      isActive={isPlaying && playingLang === 'zh'}
      color={isPlaying && playingLang === 'zh' ? 'bg-white' : 'bg-pink-500'}
    />
    <span className={`text-sm font-semibold ${
      isPlaying && playingLang === 'zh' ? 'text-white' : 'text-pink-600'
    }`}>
      中文
    </span>
  </motion.div>
</div>
```

- [ ] **Step 4: 验证动画效果**

运行开发服务器，进入游戏页面，观察播放时的脉冲和声波动画。

Run: `npm run dev`

- [ ] **Step 5: 提交更改**

```bash
git add src/components/WordCard/WordCard.tsx
git commit -m "feat(animation): 播放指示器脉冲和声波动画"
```

---

### Task 3: CategoryList 卡片涟漪效果

**Files:**
- Modify: `src/components/CategoryList/CategoryList.tsx`

**说明:** 当前卡片已有 whileHover 和 whileTap，需要添加点击涟漪效果。

- [ ] **Step 1: 添加涟漪效果 Hook**

创建 `src/hooks/useRipple.ts`:
```typescript
import { useState, useCallback } from 'react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    // 动画结束后移除涟漪
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  }, []);

  return { ripples, createRipple };
}
```

- [ ] **Step 2: 更新 CategoryList 组件使用涟漪效果**

修改 CategoryList.tsx:
```typescript
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { useRipple } from '../../hooks/useRipple';

// 涟漪动画组件
function Ripple({ x, y }: { x: number; y: number }) {
  return (
    <motion.span
      className="absolute bg-white/30 rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: 10,
        height: 10,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 20, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    />
  );
}

export function CategoryList() {
  const { categories, currentCategory, selectCategory, progress } = useGameStore();
  const { ripples, createRipple } = useRipple();

  // 计算单个分类的进度
  const getCategoryProgress = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return { completed: 0, total: 0, percentage: 0 };

    const completed = category.words.filter(
      word => progress.completedWords.includes(word.id)
    ).length;
    const total = category.words.length;
    const percentage = total > 0 ? Math.min((completed / total) * 100, 100) : 0;

    return { completed, total, percentage };
  };

  return (
    <div className="bg-white rounded-[30px] border-2 border-primary-200 p-4 shadow-sm">
      <h3 className="text-base font-bold text-primary-600 mb-3 text-center">
        选择主题 🎨
      </h3>

      {/* 5行×2列网格布局 */}
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category, index) => {
          const isActive = currentCategory?.id === category.id;
          const { completed, total, percentage } = getCategoryProgress(category.id);

          return (
            <motion.button
              key={category.id}
              onClick={(e) => {
                createRipple(e);
                selectCategory(category.id);
              }}
              className={`w-full h-[70px] rounded-2xl flex flex-col items-center justify-center gap-1 transition-all relative overflow-hidden ${
                isActive ? 'ring-2 ring-primary-400 ring-offset-2' : ''
              }`}
              style={{ backgroundColor: category.bgColor }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* 涟漪效果 */}
              {ripples.map((ripple) => (
                <Ripple key={ripple.id} x={ripple.x} y={ripple.y} />
              ))}

              <span className="text-2xl">{category.icon}</span>
              <p className="font-bold text-[11px]" style={{ color: category.color }}>
                {category.name}
              </p>

              {/* 进度条 - 只有有进度时才显示 */}
              {percentage > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: category.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
              )}

              {/* 进度数字（完成时显示星星） */}
              {completed === total && total > 0 && (
                <span className="absolute top-1 right-1 text-xs">⭐</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 创建 hooks 目录索引文件**

创建 `src/hooks/index.ts`:
```typescript
export { useAutoPlay } from './useAutoPlay';
export { useRipple } from './useRipple';
```

- [ ] **Step 4: 验证动画效果**

运行开发服务器，点击分类卡片，观察涟漪效果。

Run: `npm run dev`

- [ ] **Step 5: 提交更改**

```bash
git add src/hooks/useRipple.ts src/hooks/index.ts src/components/CategoryList/CategoryList.tsx
git commit -m "feat(animation): 分类卡片点击涟漪效果"
```

---

### Task 4: CompleteModal 增强动画

**Files:**
- Modify: `src/components/CompleteModal/CompleteModal.tsx`

**说明:** 当前弹窗已有基本动画，需要增强按钮依次滑入效果和星星动画。

- [ ] **Step 1: 增强星星动画**

更新星星显示部分，添加持续闪烁效果：
```typescript
<motion.div
  className="text-6xl mb-4"
  animate={{
    rotate: [0, -10, 10, -10, 10, 0],
    scale: [1, 1.2, 1],
  }}
  transition={{
    duration: 0.8,
    repeat: Infinity,
    repeatDelay: 1,
  }}
>
  🎉
</motion.div>
```

- [ ] **Step 2: 添加按钮滑入动画**

更新按钮部分，添加依次滑入效果：
```typescript
<motion.button
  onClick={handleGoHome}
  className="w-full bg-primary-600 text-white font-semibold py-4 rounded-2xl"
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.3, duration: 0.3 }}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  返回主页
</motion.button>
```

- [ ] **Step 3: 更新弹窗内容依次出现**

更新整个 CompleteModal 组件：
```typescript
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function CompleteModal() {
  const { showCompleteModal, closeCompleteModal, goToHome, progress } = useGameStore();

  const handleGoHome = () => {
    closeCompleteModal();
    goToHome();
  };

  return (
    <AnimatePresence>
      {showCompleteModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleGoHome}
        >
          <motion.div
            className="bg-white rounded-[40px] p-10 max-w-sm text-center shadow-2xl"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              🎉
            </motion.div>

            <motion.h2
              className="text-2xl font-bold text-primary-600 mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              太棒了！
            </motion.h2>

            <motion.p
              className="text-gray-500 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              你已经学完了这个分类的所有单词！
            </motion.p>

            <motion.div
              className="bg-primary-50 rounded-2xl p-4 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2">
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
                >
                  ⭐
                </motion.span>
                <span className="text-xl font-bold text-primary-600">
                  总共 {progress.stars} 颗星星
                </span>
              </div>
            </motion.div>

            <motion.button
              onClick={handleGoHome}
              className="w-full bg-primary-600 text-white font-semibold py-4 rounded-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              返回主页
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 4: 验证动画效果**

运行开发服务器，完成一个分类，观察弹窗动画。

Run: `npm run dev`

- [ ] **Step 5: 提交更改**

```bash
git add src/components/CompleteModal/CompleteModal.tsx
git commit -m "feat(animation): CompleteModal 弹窗增强动画"
```

---

## Chunk 2: 卡片动画

### Task 5: WordCard 方向感知切换动画

**Files:**
- Modify: `src/components/WordCard/WordCard.tsx`
- Modify: `src/store/useGameStore.ts`

**说明:** 当前卡片切换是固定方向，需要根据"上一个"或"下一个"操作改变滑动方向。

- [ ] **Step 1: 在 store 中添加切换方向状态**

修改 useGameStore.ts，添加 direction 状态：
```typescript
interface GameState {
  // ... 现有状态
  slideDirection: 'left' | 'right' | null;

  // ... 现有 Actions
}

export const useGameStore = create<GameState>((set, get) => ({
  // ... 现有实现
  slideDirection: null,

  nextWord: () => {
    const { currentCategory, currentWordIndex, markWordComplete } = get();
    if (!currentCategory) return;

    markWordComplete();

    if (currentWordIndex < currentCategory.words.length - 1) {
      set({ currentWordIndex: currentWordIndex + 1, slideDirection: 'left' });
    } else {
      set({ showCompleteModal: true });
    }
  },

  prevWord: () => {
    const { currentCategory, currentWordIndex } = get();
    if (!currentCategory || currentWordIndex <= 0) return;

    set({ currentWordIndex: currentWordIndex - 1, slideDirection: 'right' });
  },

  selectCategory: (categoryId: string) => {
    const category = get().categories.find((c) => c.id === categoryId);
    if (category) {
      set({
        currentCategory: category,
        currentWordIndex: 0,
        showCompleteModal: false,
        slideDirection: null,
      });
    }
  },

  goToHome: () => {
    stopSpeaking();
    set({
      currentCategory: null,
      currentWordIndex: 0,
      isPlaying: false,
      playingLang: null,
      showCompleteModal: false,
      slideDirection: null,
    });
  },
}));
```

- [ ] **Step 2: 更新 WordCard 使用方向感知动画**

更新 WordCard.tsx 的 AnimatePresence 部分：
```typescript
const { currentCategory, currentWordIndex, isPlaying, playingLang, slideDirection } = useGameStore();

// ... 在卡片动画部分
<AnimatePresence mode="wait">
  <motion.div
    key={word.id}
    initial={{
      opacity: 0,
      x: slideDirection === 'left' ? 100 : slideDirection === 'right' ? -100 : 0,
      y: slideDirection ? 0 : 50
    }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    exit={{
      opacity: 0,
      x: slideDirection === 'left' ? -100 : slideDirection === 'right' ? 100 : 0,
      y: 0
    }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className="w-[440px] bg-white rounded-[40px] border-[3px] border-primary-200 p-8 shadow-lg"
  >
    {/* ... 卡片内容 */}
  </motion.div>
</AnimatePresence>
```

- [ ] **Step 3: 验证动画效果**

运行开发服务器，点击"上一个"和"下一个"按钮，观察卡片切换方向。

Run: `npm run dev`

- [ ] **Step 4: 提交更改**

```bash
git add src/store/useGameStore.ts src/components/WordCard/WordCard.tsx
git commit -m "feat(animation): WordCard 方向感知切换动画"
```

---

### Task 6: WordCard 内容依次出现动画

**Files:**
- Modify: `src/components/WordCard/WordCard.tsx`

**说明:** 卡片切换时，emoji、英文、中文依次延迟出现，增加层次感。

- [ ] **Step 1: 为卡片内容添加 stagger 动画**

更新 WordCard.tsx，为卡片内元素添加依次出现效果：
```typescript
// 在文件顶部定义动画变体
const cardContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// 在卡片组件中
<motion.div
  key={word.id}
  initial={{ opacity: 0, x: slideDirection === 'left' ? 100 : slideDirection === 'right' ? -100 : 0 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: slideDirection === 'left' ? -100 : slideDirection === 'right' ? 100 : 0 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
  className="w-[440px] bg-white rounded-[40px] border-[3px] border-primary-200 p-8 shadow-lg"
>
  <motion.div
    variants={cardContentVariants}
    initial="hidden"
    animate="visible"
  >
    {/* 图片区域 */}
    <motion.div
      variants={itemVariants}
      className="w-[320px] h-[260px] bg-primary-50 rounded-[40px] border-[3px] border-primary-200 mx-auto flex items-center justify-center relative overflow-hidden"
    >
      <motion.span
        className="text-[120px]"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', damping: 10 }}
      >
        {word.emoji}
      </motion.span>
      {/* 装饰 */}
      <span className="absolute top-2 right-3 text-2xl">✨</span>
      <span className="absolute bottom-3 left-2 text-xl">⭐</span>
      <span className="absolute top-4 left-4 text-lg">💫</span>
    </motion.div>

    {/* 单词显示 */}
    <motion.div variants={itemVariants} className="mt-6 text-center">
      <motion.h2
        variants={itemVariants}
        className="text-primary-600 text-[56px] font-extrabold mb-2"
      >
        {word.english}
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-gray-500 text-[28px] font-semibold mb-1"
      >
        {word.chinese}
      </motion.p>
      <motion.p
        variants={itemVariants}
        className="text-gray-400 text-base"
      >
        {word.phonetic}
      </motion.p>
    </motion.div>
  </motion.div>
</motion.div>
```

- [ ] **Step 2: 验证动画效果**

运行开发服务器，切换单词，观察 emoji、英文、中文依次出现效果。

Run: `npm run dev`

- [ ] **Step 3: 提交更改**

```bash
git add src/components/WordCard/WordCard.tsx
git commit -m "feat(animation): WordCard 内容依次出现动画"
```

---

## Chunk 3: 吉祥物动画

### Task 7: Mascot 待机呼吸动画

**Files:**
- Modify: `src/components/Mascot/Mascot.tsx`

**说明:** 吉祥物需要添加待机时的呼吸效果，让它看起来更生动。

- [ ] **Step 1: 更新 Mascot 组件添加呼吸动画**

更新 Mascot.tsx：
```typescript
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

const messages = [
  '加油学习哦~',
  '你真棒！',
  '继续加油！',
  '太厉害了！',
  '你最棒！',
];

export function Mascot() {
  const { isPlaying, playingLang, progress } = useGameStore();

  const getMessage = () => {
    if (isPlaying) {
      return playingLang === 'en' ? '正在播放英文~' : '正在播放中文~';
    }
    if (progress.dailyProgress.completed >= progress.dailyProgress.total) {
      return '今日目标完成！🎉';
    }
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 吉祥物身体 */}
      <motion.div
        className="w-40 h-40 bg-primary-600 rounded-full flex items-center justify-center shadow-lg"
        animate={
          isPlaying
            ? {
                rotate: playingLang === 'en' ? [0, -5, 5, -5, 5, 0] : [0, 5, -5, 5, -5, 0],
              }
            : {
                scale: [1, 1.02, 1],
                y: [0, -2, 0],
              }
        }
        transition={
          isPlaying
            ? {
                duration: 0.5,
                repeat: Infinity,
              }
            : {
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      >
        <motion.span
          className="text-8xl"
          animate={isPlaying ? {} : {
            y: [0, -3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          😺
        </motion.span>
      </motion.div>

      {/* 对话气泡 */}
      <motion.div
        className="bg-white rounded-2xl border-2 border-primary-200 px-4 py-3 shadow-sm max-w-[180px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={getMessage()}
      >
        <p className="text-primary-600 font-semibold text-center text-base">
          {getMessage()}
        </p>
      </motion.div>

      {/* 名字 */}
      <span className="text-primary-600 font-bold text-sm">小紫猫</span>
    </div>
  );
}
```

- [ ] **Step 2: 验证动画效果**

运行开发服务器，观察待机时吉祥物的呼吸效果，以及播放时的点头/摇头效果。

Run: `npm run dev`

- [ ] **Step 3: 提交更改**

```bash
git add src/components/Mascot/Mascot.tsx
git commit -m "feat(animation): Mascot 待机呼吸动画和播放配合动画"
```

---

### Task 8: 最终验证和构建

**Files:**
- 无文件变更

- [ ] **Step 1: 运行完整功能测试**

测试所有动画效果：
1. TopBar 星星数字变化动画
2. 播放指示器脉冲和声波动画
3. 分类卡片涟漪效果
4. CompleteModal 弹窗动画
5. WordCard 方向感知切换动画
6. WordCard 内容依次出现
7. Mascot 呼吸和配合动画

Run: `npm run dev`

- [ ] **Step 2: 构建生产版本**

Run: `npm run build`

- [ ] **Step 3: 最终提交**

```bash
git add -A
git commit -m "feat(animation): 动画效果增强完成"
```

---

## 文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/components/TopBar/TopBar.tsx` | 修改 | 星星数字变化动画 |
| `src/components/WordCard/WordCard.tsx` | 修改 | 播放指示器、方向切换、内容依次出现 |
| `src/components/CategoryList/CategoryList.tsx` | 修改 | 涟漪效果 |
| `src/components/CompleteModal/CompleteModal.tsx` | 修改 | 弹窗增强动画 |
| `src/components/Mascot/Mascot.tsx` | 修改 | 呼吸和配合动画 |
| `src/hooks/useRipple.ts` | 新建 | 涟漪效果 Hook |
| `src/hooks/index.ts` | 新建 | Hooks 导出文件 |
| `src/store/useGameStore.ts` | 修改 | 添加 slideDirection 状态 |
