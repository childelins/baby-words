# 宝宝单词乐园 PWA 实现计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建面向 2-4 岁幼儿的单词学习 PWA 应用，支持 TTS 发音、学习进度持久化、离线使用。

**Architecture:** React SPA + Zustand 状态管理 + Web Speech API (TTS) + localStorage 持久化。组件按功能划分，状态集中管理，音频播放与 UI 解耦。

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Zustand, Framer Motion, vite-plugin-pwa

---

## Chunk 1: 项目初始化与基础配置

### Task 1.1: 初始化 Vite + React + TypeScript 项目

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`

- [ ] **Step 1: 创建 Vite 项目**

Run:
```bash
npm create vite@latest . -- --template react-ts
```

Expected: 项目初始化成功，生成基础文件

- [ ] **Step 2: 安装依赖**

Run:
```bash
npm install
npm install zustand framer-motion
npm install -D tailwindcss postcss autoprefixer vite-plugin-pwa
```

Expected: 依赖安装成功

- [ ] **Step 3: 初始化 Tailwind CSS**

Run:
```bash
npx tailwindcss init -p
```

Expected: 生成 `tailwind.config.js` 和 `postcss.config.js`

- [ ] **Step 4: 配置 Tailwind**

Modify: `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEF7FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#8B5CF6',
          700: '#7C3AED',
        },
        success: '#22C55E',
        warning: '#F97316',
        pink: '#F472B6',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: 更新全局样式**

Modify: `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  height: 100%;
  width: 100%;
}

body {
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 6: 配置 Vite PWA 插件**

Modify: `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/*.png'],
      manifest: {
        name: '宝宝单词乐园',
        short_name: '单词乐园',
        description: '面向 2-4 岁幼儿的单词学习应用',
        theme_color: '#8B5CF6',
        background_color: '#FEF7FF',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
```

- [ ] **Step 7: 提交基础配置**

```bash
git add .
git commit -m "chore: 初始化项目，配置 Vite + React + TypeScript + Tailwind + PWA

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 1.2: 创建类型定义和数据文件

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/words.json`

- [ ] **Step 1: 创建类型定义**

Create: `src/types/index.ts`

```typescript
export interface Word {
  id: string;
  emoji: string;
  english: string;
  chinese: string;
  phonetic: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  words: Word[];
}

export interface GameData {
  categories: Category[];
}

export interface DailyProgress {
  date: string;
  completed: number;
  total: number;
}

export interface Progress {
  stars: number;
  streak: number;
  lastStudyDate: string;
  completedWords: string[];
  dailyProgress: DailyProgress;
}

export type PlayLang = 'en' | 'zh';
```

- [ ] **Step 2: 创建单词数据**

Create: `src/data/words.json`

```json
{
  "categories": [
    {
      "id": "animals",
      "name": "动物世界",
      "icon": "🐾",
      "color": "#16A34A",
      "bgColor": "#F0FDF4",
      "words": [
        { "id": "cat", "emoji": "🐱", "english": "Cat", "chinese": "猫咪", "phonetic": "[kæt]", "categoryId": "animals" },
        { "id": "dog", "emoji": "🐕", "english": "Dog", "chinese": "狗狗", "phonetic": "[dɒɡ]", "categoryId": "animals" },
        { "id": "bird", "emoji": "🐦", "english": "Bird", "chinese": "小鸟", "phonetic": "[bɜːd]", "categoryId": "animals" },
        { "id": "fish", "emoji": "🐟", "english": "Fish", "chinese": "鱼", "phonetic": "[fɪʃ]", "categoryId": "animals" },
        { "id": "rabbit", "emoji": "🐰", "english": "Rabbit", "chinese": "兔子", "phonetic": "[ˈræbɪt]", "categoryId": "animals" },
        { "id": "elephant", "emoji": "🐘", "english": "Elephant", "chinese": "大象", "phonetic": "[ˈelɪfənt]", "categoryId": "animals" },
        { "id": "lion", "emoji": "🦁", "english": "Lion", "chinese": "狮子", "phonetic": "[ˈlaɪən]", "categoryId": "animals" },
        { "id": "bear", "emoji": "🐻", "english": "Bear", "chinese": "熊", "phonetic": "[beə]", "categoryId": "animals" },
        { "id": "monkey", "emoji": "🐵", "english": "Monkey", "chinese": "猴子", "phonetic": "[ˈmʌŋki]", "categoryId": "animals" },
        { "id": "pig", "emoji": "🐷", "english": "Pig", "chinese": "猪", "phonetic": "[pɪɡ]", "categoryId": "animals" },
        { "id": "cow", "emoji": "🐮", "english": "Cow", "chinese": "牛", "phonetic": "[kaʊ]", "categoryId": "animals" },
        { "id": "duck", "emoji": "🦆", "english": "Duck", "chinese": "鸭子", "phonetic": "[dʌk]", "categoryId": "animals" }
      ]
    },
    {
      "id": "food",
      "name": "美味食物",
      "icon": "🍎",
      "color": "#EA580C",
      "bgColor": "#FFF7ED",
      "words": [
        { "id": "apple", "emoji": "🍎", "english": "Apple", "chinese": "苹果", "phonetic": "[ˈæpl]", "categoryId": "food" },
        { "id": "banana", "emoji": "🍌", "english": "Banana", "chinese": "香蕉", "phonetic": "[bəˈnɑːnə]", "categoryId": "food" },
        { "id": "orange", "emoji": "🍊", "english": "Orange", "chinese": "橙子", "phonetic": "[ˈɒrɪndʒ]", "categoryId": "food" },
        { "id": "grape", "emoji": "🍇", "english": "Grape", "chinese": "葡萄", "phonetic": "[ɡreɪp]", "categoryId": "food" },
        { "id": "cake", "emoji": "🎂", "english": "Cake", "chinese": "蛋糕", "phonetic": "[keɪk]", "categoryId": "food" },
        { "id": "bread", "emoji": "🍞", "english": "Bread", "chinese": "面包", "phonetic": "[bred]", "categoryId": "food" },
        { "id": "milk", "emoji": "🥛", "english": "Milk", "chinese": "牛奶", "phonetic": "[mɪlk]", "categoryId": "food" },
        { "id": "egg", "emoji": "🥚", "english": "Egg", "chinese": "鸡蛋", "phonetic": "[eɡ]", "categoryId": "food" }
      ]
    },
    {
      "id": "colors",
      "name": "缤纷色彩",
      "icon": "🌈",
      "color": "#4F46E5",
      "bgColor": "#F0F5FF",
      "words": [
        { "id": "red", "emoji": "🔴", "english": "Red", "chinese": "红色", "phonetic": "[red]", "categoryId": "colors" },
        { "id": "blue", "emoji": "🔵", "english": "Blue", "chinese": "蓝色", "phonetic": "[bluː]", "categoryId": "colors" },
        { "id": "green", "emoji": "🟢", "english": "Green", "chinese": "绿色", "phonetic": "[ɡriːn]", "categoryId": "colors" },
        { "id": "yellow", "emoji": "🟡", "english": "Yellow", "chinese": "黄色", "phonetic": "[ˈjeləʊ]", "categoryId": "colors" },
        { "id": "purple", "emoji": "🟣", "english": "Purple", "chinese": "紫色", "phonetic": "[ˈpɜːpl]", "categoryId": "colors" }
      ]
    },
    {
      "id": "numbers",
      "name": "数字王国",
      "icon": "🔢",
      "color": "#DB2777",
      "bgColor": "#FDF2F8",
      "words": [
        { "id": "one", "emoji": "1️⃣", "english": "One", "chinese": "一", "phonetic": "[wʌn]", "categoryId": "numbers" },
        { "id": "two", "emoji": "2️⃣", "english": "Two", "chinese": "二", "phonetic": "[tuː]", "categoryId": "numbers" },
        { "id": "three", "emoji": "3️⃣", "english": "Three", "chinese": "三", "phonetic": "[θriː]", "categoryId": "numbers" },
        { "id": "four", "emoji": "4️⃣", "english": "Four", "chinese": "四", "phonetic": "[fɔː]", "categoryId": "numbers" },
        { "id": "five", "emoji": "5️⃣", "english": "Five", "chinese": "五", "phonetic": "[faɪv]", "categoryId": "numbers" },
        { "id": "six", "emoji": "6️⃣", "english": "Six", "chinese": "六", "phonetic": "[sɪks]", "categoryId": "numbers" },
        { "id": "seven", "emoji": "7️⃣", "english": "Seven", "chinese": "七", "phonetic": "[ˈsevn]", "categoryId": "numbers" },
        { "id": "eight", "emoji": "8️⃣", "english": "Eight", "chinese": "八", "phonetic": "[eɪt]", "categoryId": "numbers" },
        { "id": "nine", "emoji": "9️⃣", "english": "Nine", "chinese": "九", "phonetic": "[naɪn]", "categoryId": "numbers" },
        { "id": "ten", "emoji": "🔟", "english": "Ten", "chinese": "十", "phonetic": "[ten]", "categoryId": "numbers" }
      ]
    },
    {
      "id": "home",
      "name": "我的家",
      "icon": "🏠",
      "color": "#CA8A04",
      "bgColor": "#FEFCE8",
      "words": [
        { "id": "house", "emoji": "🏠", "english": "House", "chinese": "房子", "phonetic": "[haʊs]", "categoryId": "home" },
        { "id": "bed", "emoji": "🛏️", "english": "Bed", "chinese": "床", "phonetic": "[bed]", "categoryId": "home" },
        { "id": "chair", "emoji": "🪑", "english": "Chair", "chinese": "椅子", "phonetic": "[tʃeə]", "categoryId": "home" },
        { "id": "door", "emoji": "🚪", "english": "Door", "chinese": "门", "phonetic": "[dɔː]", "categoryId": "home" },
        { "id": "window", "emoji": "🪟", "english": "Window", "chinese": "窗户", "phonetic": "[ˈwɪndəʊ]", "categoryId": "home" },
        { "id": "table", "emoji": "🪑", "english": "Table", "chinese": "桌子", "phonetic": "[ˈteɪbl]", "categoryId": "home" }
      ]
    }
  ]
}
```

- [ ] **Step 3: 提交类型和数据**

```bash
git add src/types src/data
git commit -m "feat: 添加类型定义和单词数据

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 1.3: 创建工具函数

**Files:**
- Create: `src/utils/storage.ts`
- Create: `src/utils/tts.ts`

- [ ] **Step 1: 创建 localStorage 封装**

Create: `src/utils/storage.ts`

```typescript
import type { Progress } from '../types';

const STORAGE_KEY = 'baby-words-progress';

const defaultProgress: Progress = {
  stars: 0,
  streak: 0,
  lastStudyDate: '',
  completedWords: [],
  dailyProgress: {
    date: getTodayDate(),
    completed: 0,
    total: 10,
  },
};

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function loadProgress(): Progress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { ...defaultProgress };
    }
    const progress = JSON.parse(stored) as Progress;

    // 检查是否是新的一天
    const today = getTodayDate();
    if (progress.dailyProgress.date !== today) {
      // 检查连续学习
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (progress.lastStudyDate === yesterdayStr) {
        progress.streak += 1;
      } else if (progress.lastStudyDate !== today) {
        progress.streak = 0;
      }

      // 重置每日进度
      progress.dailyProgress = {
        date: today,
        completed: 0,
        total: 10,
      };
    }

    return progress;
  } catch {
    return { ...defaultProgress };
  }
}

export function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export function resetProgress(): Progress {
  const fresh = { ...defaultProgress };
  saveProgress(fresh);
  return fresh;
}
```

- [ ] **Step 2: 创建 TTS 工具函数**

Create: `src/utils/tts.ts`

```typescript
import type { PlayLang } from '../types';

export function speak(text: string, lang: PlayLang): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      resolve();
      return;
    }

    // 取消之前的播放
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-US' : 'zh-CN';
    utterance.rate = 0.8;
    utterance.pitch = 1.1;

    utterance.onend = () => resolve();
    utterance.onerror = (event) => {
      console.error('Speech error:', event);
      resolve(); // 即使出错也 resolve，不阻塞流程
    };

    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
```

- [ ] **Step 3: 提交工具函数**

```bash
git add src/utils
git commit -m "feat: 添加 localStorage 和 TTS 工具函数

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 2: 状态管理与核心逻辑

### Task 2.1: 创建 Zustand Store

**Files:**
- Create: `src/store/useGameStore.ts`

- [ ] **Step 1: 创建游戏状态 Store**

Create: `src/store/useGameStore.ts`

```typescript
import { create } from 'zustand';
import type { Category, Word, Progress, PlayLang } from '../types';
import { loadProgress, saveProgress, resetProgress as resetStorage } from '../utils/storage';
import { speak, stopSpeaking } from '../utils/tts';
import gameData from '../data/words.json';

interface GameState {
  // 数据
  categories: Category[];

  // 当前状态
  currentCategory: Category | null;
  currentWordIndex: number;

  // 播放状态
  isPlaying: boolean;
  playingLang: PlayLang | null;

  // 进度
  progress: Progress;

  // 完成弹窗
  showCompleteModal: boolean;

  // Actions
  selectCategory: (categoryId: string) => void;
  goToHome: () => void;
  nextWord: () => void;
  prevWord: () => void;
  playAudio: (lang: PlayLang) => Promise<void>;
  playAutoSequence: () => Promise<void>;
  stopAudio: () => void;
  markWordComplete: () => void;
  resetProgress: () => void;
  closeCompleteModal: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  categories: gameData.categories as Category[],
  currentCategory: null,
  currentWordIndex: 0,
  isPlaying: false,
  playingLang: null,
  progress: loadProgress(),
  showCompleteModal: false,

  selectCategory: (categoryId: string) => {
    const category = get().categories.find((c) => c.id === categoryId);
    if (category) {
      set({
        currentCategory: category,
        currentWordIndex: 0,
        showCompleteModal: false,
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
    });
  },

  nextWord: () => {
    const { currentCategory, currentWordIndex, markWordComplete } = get();
    if (!currentCategory) return;

    // 标记当前单词完成
    markWordComplete();

    if (currentWordIndex < currentCategory.words.length - 1) {
      set({ currentWordIndex: currentWordIndex + 1 });
    } else {
      // 已经是最后一个单词，显示完成弹窗
      set({ showCompleteModal: true });
    }
  },

  prevWord: () => {
    const { currentCategory, currentWordIndex } = get();
    if (!currentCategory || currentWordIndex <= 0) return;

    set({ currentWordIndex: currentWordIndex - 1 });
  },

  playAudio: async (lang: PlayLang) => {
    const { currentCategory, currentWordIndex } = get();
    if (!currentCategory) return;

    const word = currentCategory.words[currentWordIndex];
    const text = lang === 'en' ? word.english : word.chinese;

    set({ isPlaying: true, playingLang: lang });
    await speak(text, lang);
    set({ isPlaying: false, playingLang: null });
  },

  playAutoSequence: async () => {
    const { currentCategory, currentWordIndex } = get();
    if (!currentCategory) return;

    const word = currentCategory.words[currentWordIndex];

    // 播放英文
    set({ isPlaying: true, playingLang: 'en' });
    await speak(word.english, 'en');

    // 短暂延迟
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 播放中文
    set({ playingLang: 'zh' });
    await speak(word.chinese, 'zh');

    set({ isPlaying: false, playingLang: null });
  },

  stopAudio: () => {
    stopSpeaking();
    set({ isPlaying: false, playingLang: null });
  },

  markWordComplete: () => {
    const { currentCategory, currentWordIndex, progress } = get();
    if (!currentCategory) return;

    const word = currentCategory.words[currentWordIndex];
    const today = new Date().toISOString().split('T')[0];

    // 检查是否已经完成过这个单词
    if (progress.completedWords.includes(word.id)) {
      return;
    }

    const newProgress: Progress = {
      ...progress,
      stars: progress.stars + 1,
      lastStudyDate: today,
      completedWords: [...progress.completedWords, word.id],
      dailyProgress: {
        ...progress.dailyProgress,
        completed: progress.dailyProgress.completed + 1,
      },
    };

    saveProgress(newProgress);
    set({ progress: newProgress });
  },

  resetProgress: () => {
    const fresh = resetStorage();
    set({ progress: fresh });
  },

  closeCompleteModal: () => {
    set({ showCompleteModal: false });
  },
}));
```

- [ ] **Step 2: 提交 Store**

```bash
git add src/store
git commit -m "feat: 添加 Zustand 游戏状态管理

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2.2: 创建自定义 Hooks

**Files:**
- Create: `src/hooks/useAutoPlay.ts`

- [ ] **Step 1: 创建自动播放 Hook**

Create: `src/hooks/useAutoPlay.ts`

```typescript
import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';

export function useAutoPlay() {
  const { currentCategory, currentWordIndex, playAutoSequence, isPlaying } = useGameStore();
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    // 当切换分类或单词时，重置播放状态
    hasPlayedRef.current = false;
  }, [currentCategory?.id, currentWordIndex]);

  useEffect(() => {
    // 自动播放（延迟 500ms）
    if (currentCategory && !hasPlayedRef.current && !isPlaying) {
      hasPlayedRef.current = true;
      const timer = setTimeout(() => {
        playAutoSequence();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentCategory, currentWordIndex, playAutoSequence, isPlaying]);
}
```

- [ ] **Step 2: 提交 Hooks**

```bash
git add src/hooks
git commit -m "feat: 添加自动播放 Hook

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 3: UI 组件开发

### Task 3.1: 创建 TopBar 组件

**Files:**
- Create: `src/components/TopBar/TopBar.tsx`
- Create: `src/components/TopBar/index.ts`

- [ ] **Step 1: 创建 TopBar 组件**

Create: `src/components/TopBar/TopBar.tsx`

```tsx
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function TopBar() {
  const { progress } = useGameStore();

  return (
    <div className="w-full max-w-[1120px] mx-auto px-5">
      <div className="bg-white rounded-[30px] border-2 border-primary-200 px-6 py-3 flex items-center justify-between shadow-sm">
        {/* 星星数量 */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-2xl">⭐</span>
          </div>
          <span className="text-2xl font-extrabold text-primary-600">
            {progress.stars}
          </span>
        </div>

        {/* 标题 */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-primary-600">
            🌈 宝宝单词乐园 🌈
          </h1>
        </div>

        {/* 连续学习天数 */}
        <div className="flex items-center gap-2 bg-primary-100 rounded-full px-4 py-2">
          <span className="text-xl">🔥</span>
          <span className="text-sm font-semibold text-primary-600">
            连续学习 {progress.streak} 天
          </span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建导出文件**

Create: `src/components/TopBar/index.ts`

```typescript
export { TopBar } from './TopBar';
```

- [ ] **Step 3: 提交 TopBar**

```bash
git add src/components/TopBar
git commit -m "feat: 添加 TopBar 组件

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3.2: 创建 Mascot 组件

**Files:**
- Create: `src/components/Mascot/Mascot.tsx`
- Create: `src/components/Mascot/index.ts`

- [ ] **Step 1: 创建 Mascot 组件**

Create: `src/components/Mascot/Mascot.tsx`

```tsx
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
        animate={{
          rotate: isPlaying ? [0, -5, 5, -5, 5, 0] : 0,
        }}
        transition={{
          duration: 0.5,
          repeat: isPlaying ? Infinity : 0,
        }}
      >
        <span className="text-8xl">😺</span>
      </motion.div>

      {/* 对话气泡 */}
      <div className="bg-white rounded-2xl border-2 border-primary-200 px-4 py-3 shadow-sm max-w-[180px]">
        <p className="text-primary-600 font-semibold text-center text-base">
          {getMessage()}
        </p>
      </div>

      {/* 名字 */}
      <span className="text-primary-600 font-bold text-sm">小紫猫</span>
    </div>
  );
}
```

- [ ] **Step 2: 创建导出文件**

Create: `src/components/Mascot/index.ts`

```typescript
export { Mascot } from './Mascot';
```

- [ ] **Step 3: 提交 Mascot**

```bash
git add src/components/Mascot
git commit -m "feat: 添加 Mascot 吉祥物组件

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3.3: 创建 WordCard 组件

**Files:**
- Create: `src/components/WordCard/WordCard.tsx`
- Create: `src/components/WordCard/index.ts`

- [ ] **Step 1: 创建 WordCard 组件**

Create: `src/components/WordCard/WordCard.tsx`

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function WordCard() {
  const { currentCategory, currentWordIndex, isPlaying, playingLang } = useGameStore();

  if (!currentCategory) return null;

  const word = currentCategory.words[currentWordIndex];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 主卡片 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={word.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-[400px] bg-white rounded-[40px] border-[3px] border-primary-200 p-8 shadow-lg"
        >
          {/* 装饰条 */}
          <div className="w-[280px] h-2 bg-pink rounded-full mx-auto mb-5" />

          {/* 图片区域 */}
          <div className="w-[280px] h-[220px] bg-primary-50 rounded-[40px] border-[3px] border-primary-200 mx-auto flex items-center justify-center relative overflow-hidden">
            <span className="text-[120px]">{word.emoji}</span>
            {/* 装饰 */}
            <span className="absolute top-2 right-3 text-2xl">✨</span>
            <span className="absolute bottom-3 left-2 text-xl">⭐</span>
            <span className="absolute top-4 left-4 text-lg">💫</span>
          </div>

          {/* 单词显示 */}
          <div className="mt-6 text-center">
            <h2 className="text-primary-600 text-5xl font-extrabold mb-2">
              {word.english}
            </h2>
            <p className="text-gray-500 text-2xl font-semibold mb-1">
              {word.chinese}
            </p>
            <p className="text-gray-400 text-base">
              {word.phonetic}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 播放指示器 */}
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors ${
            isPlaying && playingLang === 'en'
              ? 'bg-primary-600'
              : 'bg-primary-100'
          }`}
        >
          <span className="text-lg">🔊</span>
          <span className={`text-sm font-semibold ${
            isPlaying && playingLang === 'en' ? 'text-white' : 'text-primary-600'
          }`}>
            English
          </span>
        </div>

        <span className="text-primary-600 text-lg">→</span>

        <div
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors ${
            isPlaying && playingLang === 'zh'
              ? 'bg-pink-500'
              : 'bg-pink-100'
          }`}
        >
          <span className="text-lg">🔊</span>
          <span className={`text-sm font-semibold ${
            isPlaying && playingLang === 'zh' ? 'text-white' : 'text-pink-600'
          }`}>
            中文
          </span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建导出文件**

Create: `src/components/WordCard/index.ts`

```typescript
export { WordCard } from './WordCard';
```

- [ ] **Step 3: 提交 WordCard**

```bash
git add src/components/WordCard
git commit -m "feat: 添加 WordCard 单词卡片组件

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3.4: 创建 CategoryList 组件

**Files:**
- Create: `src/components/CategoryList/CategoryList.tsx`
- Create: `src/components/CategoryList/index.ts`

- [ ] **Step 1: 创建 CategoryList 组件**

Create: `src/components/CategoryList/CategoryList.tsx`

```tsx
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function CategoryList() {
  const { categories, currentCategory, selectCategory, progress } = useGameStore();

  return (
    <div className="bg-white rounded-[30px] border-2 border-primary-200 p-5 shadow-sm">
      <h3 className="text-lg font-bold text-primary-600 mb-4">
        选择主题 🎨
      </h3>

      <div className="flex flex-col gap-4">
        {categories.map((category, index) => {
          const completedCount = category.words.filter((w) =>
            progress.completedWords.includes(w.id)
          ).length;
          const totalCount = category.words.length;
          const isActive = currentCategory?.id === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => selectCategory(category.id)}
              className={`w-full h-[70px] rounded-2xl flex items-center gap-3 px-4 transition-all ${
                isActive ? 'ring-2 ring-primary-400 ring-offset-2' : ''
              }`}
              style={{ backgroundColor: category.bgColor }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-3xl">{category.icon}</span>
              <div className="flex-1 text-left">
                <p className="font-bold text-base" style={{ color: category.color }}>
                  {category.name}
                </p>
                <p className="text-sm font-medium" style={{ color: category.color }}>
                  {completedCount}/{totalCount} 单词
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建导出文件**

Create: `src/components/CategoryList/index.ts`

```typescript
export { CategoryList } from './CategoryList';
```

- [ ] **Step 3: 提交 CategoryList**

```bash
git add src/components/CategoryList
git commit -m "feat: 添加 CategoryList 分类列表组件

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3.5: 创建 ProgressBar 组件

**Files:**
- Create: `src/components/ProgressBar/ProgressBar.tsx`
- Create: `src/components/ProgressBar/index.ts`

- [ ] **Step 1: 创建 ProgressBar 组件**

Create: `src/components/ProgressBar/ProgressBar.tsx`

```tsx
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function ProgressBar() {
  const { progress } = useGameStore();
  const { completed, total } = progress.dailyProgress;
  const percentage = Math.min((completed / total) * 100, 100);
  const isComplete = completed >= total;

  return (
    <div className="w-full max-w-[1120px] mx-auto px-5">
      <div className="bg-white rounded-2xl border-2 border-primary-200 px-4 py-3 flex items-center gap-4 shadow-sm">
        <span className="text-primary-600 font-semibold text-sm whitespace-nowrap">
          今日进度
        </span>

        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <span className={`font-bold text-sm whitespace-nowrap ${
          isComplete ? 'text-success' : 'text-primary-600'
        }`}>
          {completed}/{total} 单词
        </span>

        {isComplete && (
          <motion.span
            className="text-2xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            🏆
          </motion.span>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建导出文件**

Create: `src/components/ProgressBar/index.ts`

```typescript
export { ProgressBar } from './ProgressBar';
```

- [ ] **Step 3: 提交 ProgressBar**

```bash
git add src/components/ProgressBar
git commit -m "feat: 添加 ProgressBar 进度条组件

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3.6: 创建 NavButtons 组件

**Files:**
- Create: `src/components/NavButtons/NavButtons.tsx`
- Create: `src/components/NavButtons/index.ts`

- [ ] **Step 1: 创建 NavButtons 组件**

Create: `src/components/NavButtons/NavButtons.tsx`

```tsx
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function NavButtons() {
  const { currentCategory, currentWordIndex, nextWord, prevWord, goToHome } = useGameStore();

  if (!currentCategory) return null;

  const isFirstWord = currentWordIndex === 0;
  const isLastWord = currentWordIndex === currentCategory.words.length - 1;

  return (
    <div className="flex items-center justify-center gap-6">
      {/* 上一个按钮 */}
      <motion.button
        onClick={prevWord}
        disabled={isFirstWord}
        className={`w-[100px] h-[100px] rounded-3xl flex flex-col items-center justify-center gap-1 shadow-md ${
          isFirstWord
            ? 'bg-gray-100 opacity-50 cursor-not-allowed'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
        whileHover={!isFirstWord ? { scale: 1.05 } : {}}
        whileTap={!isFirstWord ? { scale: 0.95 } : {}}
      >
        <span className="text-4xl">⬅️</span>
        <span className="text-gray-500 font-semibold text-sm">上一个</span>
      </motion.button>

      {/* 主页按钮 */}
      <motion.button
        onClick={goToHome}
        className="w-[120px] h-[100px] bg-primary-600 rounded-3xl flex flex-col items-center justify-center gap-1 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-4xl">🏠</span>
        <span className="text-white font-semibold text-sm">主页</span>
      </motion.button>

      {/* 下一个按钮 */}
      <motion.button
        onClick={nextWord}
        className={`w-[100px] h-[100px] rounded-3xl flex flex-col items-center justify-center gap-1 shadow-md ${
          isLastWord ? 'bg-pink-500' : 'bg-success'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-4xl">{isLastWord ? '🎉' : '➡️'}</span>
        <span className="text-white font-semibold text-sm">
          {isLastWord ? '完成' : '下一个'}
        </span>
      </motion.button>
    </div>
  );
}
```

- [ ] **Step 2: 创建导出文件**

Create: `src/components/NavButtons/index.ts`

```typescript
export { NavButtons } from './NavButtons';
```

- [ ] **Step 3: 提交 NavButtons**

```bash
git add src/components/NavButtons
git commit -m "feat: 添加 NavButtons 导航按钮组件

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3.7: 创建 CompleteModal 组件

**Files:**
- Create: `src/components/CompleteModal/CompleteModal.tsx`
- Create: `src/components/CompleteModal/index.ts`

- [ ] **Step 1: 创建 CompleteModal 组件**

Create: `src/components/CompleteModal/CompleteModal.tsx`

```tsx
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
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              🎉
            </motion.div>

            <h2 className="text-2xl font-bold text-primary-600 mb-2">
              太棒了！
            </h2>
            <p className="text-gray-500 mb-4">
              你已经学完了这个分类的所有单词！
            </p>

            <div className="bg-primary-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="text-xl font-bold text-primary-600">
                  总共 {progress.stars} 颗星星
                </span>
              </div>
            </div>

            <motion.button
              onClick={handleGoHome}
              className="w-full bg-primary-600 text-white font-semibold py-4 rounded-2xl"
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

- [ ] **Step 2: 创建导出文件**

Create: `src/components/CompleteModal/index.ts`

```typescript
export { CompleteModal } from './CompleteModal';
```

- [ ] **Step 3: 提交 CompleteModal**

```bash
git add src/components/CompleteModal
git commit -m "feat: 添加 CompleteModal 完成弹窗组件

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 4: 应用组装与页面

### Task 4.1: 创建首页（分类选择）

**Files:**
- Create: `src/pages/HomePage.tsx`

- [ ] **Step 1: 创建首页组件**

Create: `src/pages/HomePage.tsx`

```tsx
import { motion } from 'framer-motion';
import { TopBar } from '../components/TopBar';
import { CategoryList } from '../components/CategoryList';
import { ProgressBar } from '../components/ProgressBar';
import { Mascot } from '../components/Mascot';

export function HomePage() {
  return (
    <div className="min-h-screen bg-primary-50 flex flex-col">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-primary-100 rounded-full opacity-30" />
        <div className="absolute top-[600px] right-0 w-[300px] h-[300px] bg-pink-100 rounded-full opacity-30" />
        <div className="absolute top-20 right-10 w-[200px] h-[200px] bg-green-100 rounded-full opacity-40" />
      </div>

      {/* 内容 */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 顶部栏 */}
        <div className="pt-5 pb-4">
          <TopBar />
        </div>

        {/* 主内容区 */}
        <div className="flex-1 flex items-center justify-center px-5">
          <div className="flex items-start gap-10">
            {/* 左侧吉祥物 */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Mascot />
            </motion.div>

            {/* 中间分类列表 */}
            <motion.div
              className="w-[280px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CategoryList />
            </motion.div>
          </div>
        </div>

        {/* 底部进度条 */}
        <div className="py-5">
          <ProgressBar />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交首页**

```bash
git add src/pages
git commit -m "feat: 添加 HomePage 首页组件

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4.2: 创建游戏页面

**Files:**
- Create: `src/pages/GamePage.tsx`

- [ ] **Step 1: 创建游戏页面组件**

Create: `src/pages/GamePage.tsx`

```tsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TopBar } from '../components/TopBar';
import { WordCard } from '../components/WordCard';
import { Mascot } from '../components/Mascot';
import { CategoryList } from '../components/CategoryList';
import { ProgressBar } from '../components/ProgressBar';
import { NavButtons } from '../components/NavButtons';
import { CompleteModal } from '../components/CompleteModal';
import { useGameStore } from '../store/useGameStore';
import { useAutoPlay } from '../hooks/useAutoPlay';

export function GamePage() {
  const { currentCategory } = useGameStore();

  // 自动播放 hook
  useAutoPlay();

  if (!currentCategory) return null;

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-primary-100 rounded-full opacity-30" />
        <div className="absolute top-[600px] right-0 w-[300px] h-[300px] bg-pink-100 rounded-full opacity-30" />
        <div className="absolute top-20 right-10 w-[200px] h-[200px] bg-green-100 rounded-full opacity-40" />
      </div>

      {/* 内容 */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 顶部栏 */}
        <div className="pt-5 pb-4">
          <TopBar />
        </div>

        {/* 主内容区 */}
        <div className="flex-1 flex items-start justify-center px-5 py-4 gap-6">
          {/* 左侧吉祥物 */}
          <motion.div
            className="hidden xl:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Mascot />
          </motion.div>

          {/* 中间游戏卡片区 */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <WordCard />
            <NavButtons />
          </motion.div>

          {/* 右侧分类栏 */}
          <motion.div
            className="hidden lg:block w-[260px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <CategoryList />
          </motion.div>
        </div>

        {/* 底部进度条 */}
        <div className="py-5">
          <ProgressBar />
        </div>
      </div>

      {/* 完成弹窗 */}
      <CompleteModal />
    </div>
  );
}
```

- [ ] **Step 2: 提交游戏页面**

```bash
git add src/pages/GamePage.tsx
git commit -m "feat: 添加 GamePage 游戏页面组件

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4.3: 组装 App 主入口

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: 更新 App 组件**

Modify: `src/App.tsx`

```tsx
import { useGameStore } from './store/useGameStore';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';

function App() {
  const { currentCategory } = useGameStore();

  return (
    <>
      {currentCategory ? <GamePage /> : <HomePage />}
    </>
  );
}

export default App;
```

- [ ] **Step 2: 更新 main.tsx**

Modify: `src/main.tsx`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 3: 提交主入口**

```bash
git add src/App.tsx src/main.tsx
git commit -m "feat: 组装 App 主入口，实现页面切换

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 5: PWA 资源与最终配置

### Task 5.1: 创建 PWA 图标

**Files:**
- Create: `public/icons/icon-192.png`
- Create: `public/icons/icon-512.png`

- [ ] **Step 1: 创建图标占位符**

由于需要实际图像文件，这里创建 SVG 格式的临时图标，后续可替换：

Create: `public/icons/icon-192.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192">
  <rect width="192" height="192" rx="40" fill="#8B5CF6"/>
  <text x="96" y="120" font-size="80" text-anchor="middle">😺</text>
</svg>
```

Create: `public/icons/icon-512.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="100" fill="#8B5CF6"/>
  <text x="256" y="320" font-size="200" text-anchor="middle">😺</text>
</svg>
```

- [ ] **Step 2: 更新 Vite 配置以支持 SVG 图标**

Modify: `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/*.svg'],
      manifest: {
        name: '宝宝单词乐园',
        short_name: '单词乐园',
        description: '面向 2-4 岁幼儿的单词学习应用',
        theme_color: '#8B5CF6',
        background_color: '#FEF7FF',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/icons/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
})
```

- [ ] **Step 3: 提交 PWA 图标**

```bash
git add public/icons vite.config.ts
git commit -m "feat: 添加 PWA 图标资源

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5.2: 更新 HTML 入口文件

**Files:**
- Modify: `index.html`

- [ ] **Step 1: 更新 index.html**

Modify: `index.html`

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/icons/icon-192.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#8B5CF6" />
    <meta name="description" content="面向 2-4 岁幼儿的单词学习应用" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="单词乐园" />
    <title>宝宝单词乐园</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: 提交 HTML 更新**

```bash
git add index.html
git commit -m "feat: 更新 HTML 入口文件，添加 PWA meta 标签

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5.3: 添加 npm 脚本和最终验证

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 验证并运行项目**

Run:
```bash
npm run dev
```

Expected: 开发服务器启动成功，可在浏览器访问

- [ ] **Step 2: 构建生产版本**

Run:
```bash
npm run build
```

Expected: 构建成功，生成 dist 目录

- [ ] **Step 3: 提交最终版本**

```bash
git add .
git commit -m "feat: 完成宝宝单词乐园 PWA 应用

功能：
- 单词学习卡片展示
- TTS 中英文发音
- 5 个学习分类
- 学习进度持久化
- 连续学习天数统计
- PWA 离线支持

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## 总结

本实现计划按以下顺序执行：

1. **Chunk 1**: 项目初始化与基础配置
2. **Chunk 2**: 状态管理与核心逻辑
3. **Chunk 3**: UI 组件开发
4. **Chunk 4**: 应用组装与页面
5. **Chunk 5**: PWA 资源与最终配置

每个任务都遵循 TDD 原则，包含明确的文件路径、完整代码和验证步骤。
