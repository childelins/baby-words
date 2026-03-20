# 吉祥物与主题系统实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 扩展吉祥物表情系统，实现 4 个可切换角色及配套主题配色

**Architecture:** 使用 CSS 变量实现运行时主题切换，Fluent UI Emoji SVG 作为表情资源，Zustand 管理吉祥物状态，localStorage 持久化用户选择

**Tech Stack:** React 18 + TypeScript + Tailwind CSS + Framer Motion + Zustand

---

## 文件变更概览

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/types/index.ts` | 修改 | 添加 Mascot 类型定义 |
| `src/components/Mascot/mascotConfig.ts` | 新建 | 吉祥物配置文件 |
| `src/hooks/useMascotTheme.ts` | 新建 | 主题切换 Hook |
| `src/hooks/index.ts` | 修改 | 导出新 Hook |
| `src/index.css` | 修改 | 添加 CSS 变量主题 |
| `tailwind.config.js` | 修改 | 添加 mascot 色 |
| `src/store/useGameStore.ts` | 修改 | 添加吉祥物状态 |
| `src/components/Mascot/Mascot.tsx` | 重构 | 状态表情 + 主题联动 |
| `src/components/Mascot/MascotSelector.tsx` | 新建 | 选择器组件 |
| `src/components/Mascot/index.ts` | 修改 | 更新导出 |
| `src/components/TopBar/TopBar.tsx` | 修改 | primary → mascot |
| `src/components/WordCard/WordCard.tsx` | 修改 | primary → mascot |
| `src/components/CompleteModal/CompleteModal.tsx` | 修改 | primary → mascot |
| `src/components/ProgressBar/ProgressBar.tsx` | 修改 | primary → mascot |
| `src/components/CategoryList/CategoryList.tsx` | 修改 | primary → mascot |
| `src/pages/HomePage.tsx` | 修改 | 添加 MascotSelector |
| `src/pages/GamePage.tsx` | 修改 | primary → mascot |
| `src/assets/mascots/` | 新建目录 | Fluent Emoji SVG 资源 |

---

## Task 1: 类型定义与配置

**Files:**
- Modify: `src/types/index.ts`
- Create: `src/components/Mascot/mascotConfig.ts`

### 1.1 添加 Mascot 类型定义

- [ ] **Step 1: 添加类型定义到 types/index.ts**

在文件末尾添加：

```typescript
// 吉祥物类型
export type MascotId = 'cat' | 'rabbit' | 'bear' | 'duck';

// 吉祥物状态
export type MascotState = 'idle' | 'learning' | 'happy' | 'celebrate';

// 吉祥物配置
export interface MascotConfig {
  id: MascotId;
  name: string;
  emoji: string;
  colors: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
  };
}
```

### 1.2 创建吉祥物配置文件

- [ ] **Step 2: 创建 mascotConfig.ts**

```typescript
import type { MascotConfig, MascotId, MascotState } from '../../types';

// 吉祥物配置
export const mascots: Record<MascotId, MascotConfig> = {
  cat: {
    id: 'cat',
    name: '小紫猫',
    emoji: '😺',
    colors: {
      50: '#FEF7FF',
      100: '#F3E8FF',
      200: '#E9D5FF',
      300: '#D8B4FE',
      400: '#C084FC',
      500: '#A855F7',
      600: '#8B5CF6',
      700: '#7C3AED',
    },
  },
  rabbit: {
    id: 'rabbit',
    name: '小粉兔',
    emoji: '🐰',
    colors: {
      50: '#FDF2F8',
      100: '#FCE7F3',
      200: '#FBCFE8',
      300: '#F9A8D4',
      400: '#F472B6',
      500: '#EC4899',
      600: '#DB2777',
      700: '#BE185D',
    },
  },
  bear: {
    id: 'bear',
    name: '小蓝熊',
    emoji: '🐻',
    colors: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
    },
  },
  duck: {
    id: 'duck',
    name: '小黄鸭',
    emoji: '🐤',
    colors: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
    },
  },
};

// 默认吉祥物
export const defaultMascot: MascotId = 'cat';

// 吉祥物 ID 列表
export const mascotIds: MascotId[] = ['cat', 'rabbit', 'bear', 'duck'];

// 状态对应的表情映射（使用 emoji 作为占位符，后续替换为 SVG）
export const stateEmojis: Record<MascotState, Record<MascotId, string>> = {
  idle: {
    cat: '😺',
    rabbit: '🐰',
    bear: '🐻',
    duck: '🐤',
  },
  learning: {
    cat: '😸',
    rabbit: '😻',
    bear: '🐻‍❄️',
    duck: '🦆',
  },
  happy: {
    cat: '😻',
    rabbit: '💕',
    bear: '🧸',
    duck: '🌟',
  },
  celebrate: {
    cat: '🥳',
    rabbit: '🎉',
    bear: '🎊',
    duck: '✨',
  },
};

// 状态对应的对话消息
export const stateMessages: Record<MascotState, string[]> = {
  idle: ['加油学习哦~', '你真棒！', '继续加油！', '太厉害了！', '你最棒！'],
  learning: ['正在播放英文~', '正在播放中文~'],
  happy: ['好棒！', '学会了！', '太厉害了！'],
  celebrate: ['全部学完啦！🎉', '你太棒了！🎊', '继续加油！💪'],
};

// 获取随机消息
export function getRandomMessage(state: MascotState): string {
  const messages = stateMessages[state];
  return messages[Math.floor(Math.random() * messages.length)];
}
```

---

## Task 2: CSS 变量主题系统

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.js`

### 2.1 添加 CSS 变量

- [ ] **Step 1: 修改 index.css**

在 `@tailwind components;` 之前添加：

```css
/* 吉祥物主题变量 */
:root {
  --color-mascot-50: #FEF7FF;
  --color-mascot-100: #F3E8FF;
  --color-mascot-200: #E9D5FF;
  --color-mascot-300: #D8B4FE;
  --color-mascot-400: #C084FC;
  --color-mascot-500: #A855F7;
  --color-mascot-600: #8B5CF6;
  --color-mascot-700: #7C3AED;
}

[data-mascot="rabbit"] {
  --color-mascot-50: #FDF2F8;
  --color-mascot-100: #FCE7F3;
  --color-mascot-200: #FBCFE8;
  --color-mascot-300: #F9A8D4;
  --color-mascot-400: #F472B6;
  --color-mascot-500: #EC4899;
  --color-mascot-600: #DB2777;
  --color-mascot-700: #BE185D;
}

[data-mascot="bear"] {
  --color-mascot-50: #EFF6FF;
  --color-mascot-100: #DBEAFE;
  --color-mascot-200: #BFDBFE;
  --color-mascot-300: #93C5FD;
  --color-mascot-400: #60A5FA;
  --color-mascot-500: #3B82F6;
  --color-mascot-600: #2563EB;
  --color-mascot-700: #1D4ED8;
}

[data-mascot="duck"] {
  --color-mascot-50: #FFFBEB;
  --color-mascot-100: #FEF3C7;
  --color-mascot-200: #FDE68A;
  --color-mascot-300: #FCD34D;
  --color-mascot-400: #FBBF24;
  --color-mascot-500: #F59E0B;
  --color-mascot-600: #D97706;
  --color-mascot-700: #B45309;
}

/* 主题过渡动画 */
* {
  transition-property: background-color, border-color, color;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
}
```

### 2.2 更新 Tailwind 配置

- [ ] **Step 2: 修改 tailwind.config.js**

将 `colors` 部分修改为：

```javascript
colors: {
  mascot: {
    50: 'var(--color-mascot-50)',
    100: 'var(--color-mascot-100)',
    200: 'var(--color-mascot-200)',
    300: 'var(--color-mascot-300)',
    400: 'var(--color-mascot-400)',
    500: 'var(--color-mascot-500)',
    600: 'var(--color-mascot-600)',
    700: 'var(--color-mascot-700)',
  },
  // 保留 primary 作为 mascot 的别名，便于迁移
  primary: {
    50: 'var(--color-mascot-50)',
    100: 'var(--color-mascot-100)',
    200: 'var(--color-mascot-200)',
    300: 'var(--color-mascot-300)',
    400: 'var(--color-mascot-400)',
    500: 'var(--color-mascot-500)',
    600: 'var(--color-mascot-600)',
    700: 'var(--color-mascot-700)',
  },
  success: '#22C55E',
  warning: '#F97316',
  pink: '#F472B6',
},
```

---

## Task 3: 主题切换 Hook

**Files:**
- Create: `src/hooks/useMascotTheme.ts`
- Modify: `src/hooks/index.ts`

### 3.1 创建 useMascotTheme Hook

- [ ] **Step 1: 创建 useMascotTheme.ts**

```typescript
import { useEffect, useState } from 'react';
import type { MascotId } from '../types';
import { defaultMascot } from '../components/Mascot/mascotConfig';

const STORAGE_KEY = 'mascot';

export function useMascotTheme() {
  const [mascot, setMascotState] = useState<MascotId>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as MascotId) || defaultMascot;
  });

  // 初始化时应用主题
  useEffect(() => {
    document.documentElement.setAttribute('data-mascot', mascot);
  }, []);

  const setMascot = (newMascot: MascotId) => {
    setMascotState(newMascot);
    localStorage.setItem(STORAGE_KEY, newMascot);
    document.documentElement.setAttribute('data-mascot', newMascot);
  };

  return { mascot, setMascot };
}
```

### 3.2 更新 hooks 导出

- [ ] **Step 2: 修改 hooks/index.ts**

```typescript
export { useRipple } from './useRipple';
export { useAutoPlay } from './useAutoPlay';
export { useMascotTheme } from './useMascotTheme';
```

---

## Task 4: Store 状态扩展

**Files:**
- Modify: `src/store/useGameStore.ts`

### 4.1 添加吉祥物状态

- [ ] **Step 1: 修改 useGameStore.ts**

在 `GameState` interface 中添加（`slideDirection` 之后）：

```typescript
  // 吉祥物状态
  mascotState: 'idle' | 'learning' | 'happy' | 'celebrate';
  happyTimer: number | null;
```

在 `Actions` 部分添加：

```typescript
  setMascotState: (state: 'idle' | 'learning' | 'happy' | 'celebrate') => void;
```

在 `create` 函数中，初始状态添加：

```typescript
  mascotState: 'idle',
  happyTimer: null,
```

在 Actions 中添加（`closeCompleteModal` 之后）：

```typescript
  setMascotState: (state) => {
    const { happyTimer } = get();
    // 清除之前的定时器
    if (happyTimer) {
      clearTimeout(happyTimer);
    }

    // 如果是 happy 状态，1.5 秒后恢复 idle
    if (state === 'happy') {
      const timer = window.setTimeout(() => {
        set({ mascotState: 'idle', happyTimer: null });
      }, 1500);
      set({ mascotState: state, happyTimer: timer });
    } else {
      set({ mascotState: state, happyTimer: null });
    }
  },
```

修改 `playAudio` 方法，在 `set({ isPlaying: true, playingLang: lang })` 后添加：

```typescript
    get().setMascotState('learning');
```

在 `set({ isPlaying: false, playingLang: null })` 前添加：

```typescript
    get().setMascotState('happy');
```

修改 `goToHome` 方法，添加重置吉祥物状态：

```typescript
  goToHome: () => {
    stopSpeaking();
    const { happyTimer } = get();
    if (happyTimer) {
      clearTimeout(happyTimer);
    }
    set({
      currentCategory: null,
      currentWordIndex: 0,
      isPlaying: false,
      playingLang: null,
      showCompleteModal: false,
      slideDirection: null,
      mascotState: 'idle',
      happyTimer: null,
    });
  },
```

修改 `nextWord` 方法，在 `set({ showCompleteModal: true })` 前添加：

```typescript
      get().setMascotState('celebrate');
```

修改 `closeCompleteModal` 方法：

```typescript
  closeCompleteModal: () => {
    set({ showCompleteModal: false, mascotState: 'idle' });
  },
```

---

## Task 5: 重构 Mascot 组件

**Files:**
- Rewrite: `src/components/Mascot/Mascot.tsx`

### 5.1 重写 Mascot 组件

- [ ] **Step 1: 重写 Mascot.tsx**

```typescript
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { useMascotTheme } from '../../hooks/useMascotTheme';
import { mascots, stateEmojis, getRandomMessage } from './mascotConfig';
import type { MascotState } from '../../types';

// 表情切换动画变体
const emojiVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

// 状态动画配置
const stateAnimations: Record<MascotState, object> = {
  idle: {
    scale: [1, 1.02, 1],
    y: [0, -2, 0],
  },
  learning: {
    rotate: [0, -5, 5, -5, 5, 0],
  },
  happy: {
    scale: [1, 1.1, 1],
  },
  celebrate: {
    scale: [1, 1.15, 1.1, 1.15, 1],
    rotate: [0, -10, 10, -10, 10, 0],
  },
};

// 状态动画过渡配置
const stateTransitions: Record<MascotState, object> = {
  idle: {
    duration: 2.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
  learning: {
    duration: 0.5,
    repeat: Infinity,
  },
  happy: {
    duration: 0.3,
    repeat: 0,
  },
  celebrate: {
    duration: 0.8,
    repeat: Infinity,
  },
};

export function Mascot() {
  const { mascotState, isPlaying, playingLang, progress } = useGameStore();
  const { mascot } = useMascotTheme();

  const config = mascots[mascot];
  const emoji = stateEmojis[mascotState][mascot];

  // 获取对话消息
  const getMessage = (): string => {
    if (mascotState === 'learning' && isPlaying) {
      return playingLang === 'en' ? '正在播放英文~' : '正在播放中文~';
    }
    if (mascotState === 'celebrate') {
      return '全部学完啦！🎉';
    }
    if (progress.dailyProgress.completed >= progress.dailyProgress.total) {
      return '今日目标完成！🎉';
    }
    return getRandomMessage(mascotState);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 吉祥物身体 */}
      <motion.div
        className="w-40 h-40 bg-mascot-600 rounded-full flex items-center justify-center shadow-lg"
        animate={stateAnimations[mascotState]}
        transition={stateTransitions[mascotState]}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`${mascot}-${mascotState}`}
            className="text-8xl"
            variants={emojiVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            {emoji}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* 对话气泡 */}
      <motion.div
        className="bg-white rounded-2xl border-2 border-mascot-200 px-4 py-3 shadow-sm max-w-[180px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={getMessage()}
      >
        <p className="text-mascot-600 font-semibold text-center text-base">
          {getMessage()}
        </p>
      </motion.div>

      {/* 名字 */}
      <span className="text-mascot-600 font-bold text-sm">{config.name}</span>
    </div>
  );
}
```

---

## Task 6: 创建 MascotSelector 组件

**Files:**
- Create: `src/components/Mascot/MascotSelector.tsx`

### 6.1 创建选择器组件

- [ ] **Step 1: 创建 MascotSelector.tsx**

```typescript
import { motion } from 'framer-motion';
import { useMascotTheme } from '../../hooks/useMascotTheme';
import { mascots, mascotIds } from './mascotConfig';
import type { MascotId } from '../../types';

export function MascotSelector() {
  const { mascot, setMascot } = useMascotTheme();

  return (
    <div className="w-full max-w-[1120px] mx-auto px-5 mb-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 px-4 py-3">
        <p className="text-center text-gray-500 text-sm mb-3">选择你的小伙伴</p>
        <div className="flex justify-center gap-4">
          {mascotIds.map((id) => {
            const config = mascots[id];
            const isSelected = mascot === id;

            return (
              <motion.button
                key={id}
                onClick={() => setMascot(id)}
                className={`relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-mascot-50 ring-2 ring-mascot-600'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-3xl">{config.emoji}</span>
                <span className={`text-xs font-medium ${
                  isSelected ? 'text-mascot-600' : 'text-gray-500'
                }`}>
                  {config.name}
                </span>
                {isSelected && (
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-mascot-600 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

---

## Task 7: 更新导出和集成

**Files:**
- Modify: `src/components/Mascot/index.ts`
- Modify: `src/pages/HomePage.tsx`

### 7.1 更新 Mascot 导出

- [ ] **Step 1: 修改 Mascot/index.ts**

```typescript
export { Mascot } from './Mascot';
export { MascotSelector } from './MascotSelector';
export { mascots, mascotIds, defaultMascot, getRandomMessage } from './mascotConfig';
```

### 7.2 集成选择器到首页

- [ ] **Step 2: 修改 HomePage.tsx**

在 ProgressBar 组件之前添加 MascotSelector：

```typescript
import { MascotSelector } from '../components/Mascot';

// 在 return 中，ProgressBar 之前添加：
        {/* 吉祥物选择器 */}
        <div className="py-2">
          <MascotSelector />
        </div>

        {/* 底部进度条 */}
        <div className="py-5">
          <ProgressBar />
        </div>
```

同时将 `bg-primary-50` 改为 `bg-mascot-50`：

```typescript
<div className="min-h-screen bg-mascot-50 flex flex-col">
```

---

## Task 8: 组件主题迁移

**Files:**
- Modify: `src/pages/GamePage.tsx`

### 8.1 迁移 GamePage

- [ ] **Step 1: 修改 GamePage.tsx**

将 `bg-primary-50` 改为 `bg-mascot-50`。

---

## Task 9: 验证与提交

### 9.1 构建验证

- [ ] **Step 1: 运行构建**

```bash
npm run build
```

Expected: 构建成功，无错误

### 9.2 功能验证

- [ ] **Step 2: 启动开发服务器**

```bash
npm run dev
```

验证项目：
1. 首页显示吉祥物选择器
2. 点击切换吉祥物，主题色变化
3. 进入学习页面，吉祥物显示选中角色
4. 播放发音时，表情变为 learning
5. 播放完成，表情变为 happy 后恢复
6. 分类完成，表情变为 celebrate

### 9.3 提交

- [ ] **Step 3: 提交变更**

```bash
git add .
git commit -m "$(cat <<'EOF'
feat: 吉祥物表情系统与主题切换

- 新增 4 个吉祥物角色（小紫猫、小粉兔、小蓝熊、小黄鸭）
- 实现状态表情系统（idle/learning/happy/celebrate）
- CSS 变量实现运行时主题切换
- 新增 MascotSelector 选择器组件
- 新增 useMascotTheme Hook
- localStorage 持久化用户选择

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## 变更汇总

| 指标 | 变更前 | 变更后 |
|------|--------|--------|
| 吉祥物数量 | 1 | 4 |
| 表情状态 | 0 | 4 |
| 主题色 | 固定紫色 | 4 种可选 |
| 新增文件 | - | 3 |
| 修改文件 | - | 11 |
