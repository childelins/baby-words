# 项目发现记录

## 设计稿分析 (main.pen)

### 布局结构

```
┌─────────────────────────────────────────────────────────────┐
│                      TopBar (顶部栏)                         │
│  [⭐ 128]          🌈 宝宝单词乐园 🌈         🔥 连续7天     │
├───────────────┬─────────────────────┬───────────────────────┤
│               │                     │                       │
│   Mascot      │     WordCard        │    CategoryList       │
│   (吉祥物)     │     (单词卡片)       │    (分类列表)         │
│               │                     │    5行×2列网格        │
│               │                     │                       │
│               ├─────────────────────┤                       │
│               │    NavButtons       │                       │
│               │    (导航按钮)        │                       │
│               │    含键盘提示        │                       │
├───────────────┴─────────────────────┴───────────────────────┤
│                    ProgressBar (进度条)                      │
│   今日进度  ████████░░░░░░░░  5/10 单词  🏆                │
└─────────────────────────────────────────────────────────────┘
```

### 设计稿关键尺寸

| 元素 | 尺寸/位置 |
|------|----------|
| 画布 | 1920 × 1080 |
| 顶部栏 | 1080×60, x=420 |
| 吉祥物 | x=420, y=120 |
| 单词卡片 | 520×620, x=660, y=100 |
| 分类侧边栏 | 280×520, x=1220, y=100 |
| 进度条 | 1080×40, x=420, y=980 |
| 导航按钮 | x=660, y=740 |

### 背景装饰位置

| 装饰 | 位置 | 尺寸 | 颜色 | 透明度 |
|------|------|------|------|--------|
| bgDeco1 | x=200, y=0 | 350×350 | #E0D4F7 | 0.3 |
| bgDeco2 | x=1450, y=630 | 400×400 | #FBD5E8 | 0.3 |
| bgDeco3 | x=1550, y=50 | 300×300 | #D4F7E0 | 0.4 |

### 分类配色方案

| 分类 | 图标 | 名称 | 文字色 | 背景色 |
|------|------|------|--------|--------|
| 动物世界 | 🐾 | 动物世界 | #16A34A | #F0FDF4 |
| 美味食物 | 🍎 | 美味食物 | #EA580C | #FFF7ED |
| 缤纷色彩 | 🌈 | 缤纷色彩 | #4F46E5 | #F0F5FF |
| 数字王国 | 🔢 | 数字王国 | #DB2777 | #FDF2F8 |
| 我的家 | 🏠 | 我的家 | #CA8A04 | #FEFCE8 |
| 交通工具 | 🚗 | 交通工具 | #2563EB | #EFF6FF |
| 家庭成员 | 👨‍👩‍👧‍👦 | 家庭成员 | #DB2777 | #FDF2F8 |
| 身体部位 | 🖐️ | 身体部位 | #059669 | #ECFDF5 |
| 服装配饰 | 👕 | 服装配饰 | #D97706 | #FEF3C7 |
| 自然植物 | 🌳 | 自然植物 | #16A34A | #F0FDF4 |

---

## 技术发现

### Web Speech API

- 使用 `SpeechSynthesisUtterance` 实现 TTS
- 英文发音：`en-US`
- 中文发音：`zh-CN`
- 建议语速：`rate: 0.8`（适合幼儿）

### Zustand 状态管理

```typescript
// 核心状态结构
interface GameState {
  categories: Category[];
  currentCategory: Category | null;
  currentWordIndex: number;
  isPlaying: boolean;
  playingLang: 'en' | 'zh' | null;
  progress: Progress;
  showCompleteModal: boolean;
}
```

### 键盘快捷键

| 按键 | 功能 |
|------|------|
| Space | 重复播放发音 |
| ← | 上一个单词 |
| → | 下一个单词 |
| Esc | 关闭弹窗/返回主页 |

---

## 进度追踪分析

### 进度数据结构
```typescript
interface Progress {
  stars: number;
  lastStudyDate: string;
  completedWords: string[];  // 已完成单词ID数组
  dailyProgress: {
    completed: number;
    total: number;
  };
}
```

### 分类进度计算方式
- 遍历 `category.words`，统计 `word.id` 在 `progress.completedWords` 中的数量
- 进度百分比 = 已完成数 / 总单词数

### 当前键盘事件位置
- 键盘事件监听在 `src/hooks/useAutoPlay.ts`
- 使用 `useEffect` 添加/移除事件监听

---

## 动画实现发现 (2026-03-15)

### Framer Motion 最佳实践

#### AnimatePresence 使用
- 使用 `mode="popLayout"` 实现数字变化动画
- 使用 `mode="wait"` 实现卡片切换动画
- 必须为子元素设置 `key` 属性触发动画

#### 动画性能优化
- 使用 `transform` 属性（x, y, scale, rotate）而非 layout 属性
- 避免动画 `width`/`height`，使用 `scale` 替代
- 使用 `easeOut` 缓动函数使动画更自然

#### 条件动画
```typescript
animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
transition={{
  duration: 0.6,
  repeat: isPlaying ? Infinity : 0,
  ease: 'easeInOut',
}}
```

### 涟漪效果实现

```typescript
// useRipple Hook 核心逻辑
const createRipple = (event: React.MouseEvent<HTMLButtonElement>, key: string) => {
  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  setRipples(prev => [...prev, { x, y, id: Date.now(), key }]);
  setTimeout(() => removeRipple(id), 600);
};
```

**注意事项**:
- 使用 `useRef` 保存 timeout IDs，组件卸载时清理
- 使用 `key` 区分不同元素的涟漪，避免跨元素显示

### 卡片方向感知动画

```typescript
// store 中添加 slideDirection 状态
slideDirection: 'left' | 'right' | null

// 切换时设置方向
nextWord: set({ slideDirection: 'left' })
prevWord: set({ slideDirection: 'right' })

// 动画中使用
initial={{ x: direction === 'left' ? 100 : -100 }}
exit={{ x: direction === 'left' ? -100 : 100 }}
```

### Stagger 动画模式

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

### 动画时长建议

| 类型 | 时长 | 说明 |
|------|------|------|
| 即时反馈 | 100-200ms | 按钮点击、hover |
| 状态变化 | 200-400ms | 卡片切换、弹窗出现 |
| 循环动画 | 2-3s | 呼吸、摇晃等 |
| 声波动画 | 400-600ms | 播放指示器 |
