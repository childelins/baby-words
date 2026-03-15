# 宝宝单词乐园 PWA 设计文档

## 概述

面向 2-4 岁幼儿的单词学习 Web 应用，采用 PWA 技术实现可安装、离线可用的体验。

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **动画**: Framer Motion
- **音频**: Web Speech API (TTS)
- **PWA**: vite-plugin-pwa

## 项目结构

```
baby-words-v2/
├── public/
│   ├── icons/              # PWA 图标
│   └── manifest.json       # PWA 配置
├── src/
│   ├── components/
│   │   ├── TopBar/         # 顶部栏
│   │   ├── Mascot/         # 吉祥物
│   │   ├── WordCard/       # 单词卡片
│   │   ├── PlayIndicator/  # 播放指示器
│   │   ├── CategoryList/   # 分类列表
│   │   ├── ProgressBar/    # 底部进度条
│   │   └── NavButtons/     # 导航按钮
│   ├── data/
│   │   └── words.json      # 单词数据
│   ├── hooks/
│   │   ├── useAudio.ts     # 音频播放
│   │   └── useProgress.ts  # 学习进度
│   ├── store/
│   │   └── useGameStore.ts # Zustand 状态管理
│   ├── types/
│   │   └── index.ts        # TypeScript 类型定义
│   ├── utils/
│   │   ├── storage.ts      # localStorage 封装
│   │   └── tts.ts          # TTS 工具函数
│   ├── App.tsx
│   └── main.tsx
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## 数据模型

### 单词数据 (words.json)

```typescript
interface Word {
  id: string;
  emoji: string;        // 显示图标 🐱
  english: string;      // Cat
  chinese: string;      // 猫咪
  phonetic: string;     // [kæt]
  categoryId: string;
}

interface Category {
  id: string;
  name: string;         // 动物世界
  icon: string;         // 🐾
  color: string;        // 分类主题色
  words: Word[];
}

interface GameData {
  categories: Category[];
}
```

### 用户进度 (localStorage)

```typescript
interface Progress {
  stars: number;              // 总星星数
  streak: number;             // 连续学习天数
  lastStudyDate: string;      // 最后学习日期 (YYYY-MM-DD)
  completedWords: string[];   // 已学单词 ID 列表
  dailyProgress: {
    date: string;             // 当日日期
    completed: number;        // 今日完成数
    total: number;            // 今日目标数
  };
}
```

## 状态管理

```typescript
interface GameState {
  // 当前学习状态
  currentCategory: Category | null;
  currentWordIndex: number;

  // 播放状态
  isPlaying: boolean;
  playingLang: 'en' | 'zh' | null;

  // 用户进度
  progress: Progress;

  // Actions
  selectCategory: (category: Category) => void;
  nextWord: () => void;
  prevWord: () => void;
  playAudio: (lang: 'en' | 'zh') => void;
  markComplete: () => void;
  resetProgress: () => void;
}
```

## 核心交互流程

### 自动播放机制

```
进入单词页面
    ↓
延迟 500ms
    ↓
播放英文发音 (TTS)
    ↓
延迟 300ms
    ↓
播放中文发音 (TTS)
    ↓
播放指示器切换显示
```

### 按钮交互

| 按钮 | 行为 |
|------|------|
| 上一个 | 切换到前一个单词（边界时禁用） |
| 主页 | 返回分类选择页 |
| 下一个 | 切换到下一个单词，最后一个时显示"完成"弹窗 |

### 进度更新逻辑

- 每学完一个单词（点击"下一个"或自动播放完）→ +1 星星
- 每日首次打开应用 → 检查日期，更新连续天数
- 今日进度达到目标（10 个）→ 显示庆祝动画

### 幼儿友好设计

- 按钮最小 100x100px（易点击）
- 播放状态用大图标 + 颜色变化提示
- 减少文字依赖，用 emoji 和动画引导
- 防误触：关键操作（如重置）需长按确认

## 技术实现

### TTS 音频播放

```typescript
// utils/tts.ts
export function speak(text: string, lang: 'en' | 'zh'): Promise<void> {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-US' : 'zh-CN';
    utterance.rate = 0.8;  // 幼儿适用慢速
    utterance.onend = () => resolve();
    speechSynthesis.speak(utterance);
  });
}
```

### PWA 配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '宝宝单词乐园',
        short_name: '单词乐园',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
});
```

### 动画策略

使用 `framer-motion`：
- 单词切换：卡片翻转/滑动效果
- 吉祥物：轻微摇晃动画
- 星星增加：弹出 + 闪烁
- 进度条：平滑填充动画

### 响应式适配

| 屏幕宽度 | 布局调整 |
|---------|---------|
| >= 1024px | 设计稿原布局（三栏） |
| 768-1023px | 分类侧边栏收起为底部抽屉 |
| < 768px | 单栏布局，全屏卡片 |

## 开发计划

### 阶段一：基础搭建
- 初始化项目（Vite + React + TypeScript）
- 配置 Tailwind CSS + PWA
- 搭建项目结构
- 编写单词数据 JSON

### 阶段二：核心组件
- TopBar（星星、标题、连续天数）
- WordCard（卡片主体）
- NavButtons（导航按钮）

### 阶段三：核心功能
- Zustand 状态管理
- TTS 音频播放
- 自动播放流程
- 分类切换逻辑

### 阶段四：进度系统
- localStorage 存储
- 进度条显示
- 连续学习天数计算

### 阶段五：完善体验
- 动画效果
- 响应式适配
- 吉祥物对话气泡
- 完成庆祝动画

### 阶段六：PWA 优化
- 离线支持
- 安装提示
- 图标资源

## 设计稿参考

基于 `main.pen` 设计文件实现，主要界面元素：

- **顶部栏**：星星积分、标题、连续学习天数
- **左侧吉祥物**：紫猫角色 + 对话气泡
- **中央游戏卡片**：单词卡片（emoji图片、英文、中文、音标）+ 自动播放指示器
- **右侧分类栏**：5 个学习分类
- **底部进度条**：今日学习进度
- **导航按钮**：上一个/主页/下一个
