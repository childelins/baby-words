# 夜间模式实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use planning-with-files to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为宝宝单词乐园添加夜间切换模式，采用柔和暗色风格，手动按钮切换。

**Architecture:** 扩展现有 `data-mascot` CSS 变量机制，叠加 `data-theme` 属性控制日间/夜间模式。夜间模式下保留吉祥物主题色作为强调色。

**Tech Stack:** React 18, TypeScript, Tailwind CSS, CSS Variables, localStorage

---

## 文件结构

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/index.css` | 修改 | 添加日间/夜间模式 CSS 变量 |
| `tailwind.config.js` | 修改 | 添加主题色 Tailwind 配置 |
| `src/hooks/useTheme.ts` | 新建 | 主题切换 Hook |
| `src/hooks/index.ts` | 修改 | 导出 useTheme |
| `src/components/TopBar/TopBar.tsx` | 修改 | 添加切换按钮，适配主题 |
| `src/pages/HomePage.tsx` | 修改 | 背景装饰使用主题变量 |
| `src/pages/GamePage.tsx` | 修改 | 背景装饰使用主题变量 |
| `src/components/CategoryList/CategoryList.tsx` | 修改 | 卡片背景适配主题 |
| `src/components/WordCard/WordCard.tsx` | 修改 | 卡片背景适配主题 |
| `src/components/Mascot/MascotSelector.tsx` | 修改 | 选择器背景适配主题 |
| `src/components/ProgressBar/ProgressBar.tsx` | 修改 | 进度条背景适配主题 |
| `src/components/CompleteModal/CompleteModal.tsx` | 修改 | 弹窗背景适配主题 |

---

### Task 1: CSS 变量系统

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.js`

- [ ] **Step 1: 添加日间模式 CSS 变量**

在 `src/index.css` 的 `:root` 选择器中添加主题变量（在现有吉祥物变量之后）：

```css
/* 主题变量 - 日间模式（默认） */
:root {
  /* ... 现有 mascot 变量保持不变 ... */

  /* 主题背景色 */
  --color-bg-page: var(--color-mascot-50);
  --color-bg-card: #ffffff;
  --color-bg-container: #ffffff;
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;
  --color-text-muted: #9ca3af;
  --color-border: var(--color-mascot-200);

  /* 背景装饰 */
  --color-decoration-1: #E0D4F7;
  --color-decoration-2: #FBD5E8;
  --color-decoration-3: #D4F7E0;
}
```

- [ ] **Step 2: 添加夜间模式 CSS 变量**

在 `src/index.css` 中添加夜间模式选择器（在 `:root` 之后）：

```css
/* 夜间模式 */
[data-theme="dark"] {
  /* 主题背景色 */
  --color-bg-page: #0f0f1a;
  --color-bg-card: #1a1a2e;
  --color-bg-container: #1a1a2e;
  --color-text-primary: #e0e0e0;
  --color-text-secondary: #a0a0a0;
  --color-text-muted: #6b7280;
  --color-border: #2d3748;

  /* 背景装饰 - 夜间模式暗色 */
  --color-decoration-1: #2d2d44;
  --color-decoration-2: #3d2d44;
  --color-decoration-3: #2d3d44;
}
```

- [ ] **Step 3: 更新 Tailwind 配置**

修改 `tailwind.config.js`，在 `colors` 中添加主题色：

```javascript
colors: {
  mascot: {
    // ... 现有配置保持不变 ...
  },
  primary: {
    // ... 现有配置保持不变 ...
  },
  // 新增主题色
  theme: {
    bg: 'var(--color-bg-page)',
    'bg-card': 'var(--color-bg-card)',
    'bg-container': 'var(--color-bg-container)',
    text: 'var(--color-text-primary)',
    'text-secondary': 'var(--color-text-secondary)',
    'text-muted': 'var(--color-text-muted)',
    border: 'var(--color-border)',
    'decoration-1': 'var(--color-decoration-1)',
    'decoration-2': 'var(--color-decoration-2)',
    'decoration-3': 'var(--color-decoration-3)',
  },
  success: '#22C55E',
  warning: '#F97316',
  pink: '#F472B6',
},
```

- [ ] **Step 4: 验证 CSS 变量**

运行构建确保语法正确：

```bash
npm run build
```

Expected: 构建成功，无错误

- [ ] **Step 5: 提交 CSS 变量系统**

```bash
git add src/index.css tailwind.config.js
git commit -m "feat(theme): 添加日间/夜间模式 CSS 变量系统"
```

---

### Task 2: 主题 Hook

**Files:**
- Create: `src/hooks/useTheme.ts`
- Modify: `src/hooks/index.ts`

- [ ] **Step 1: 创建 useTheme Hook**

创建 `src/hooks/useTheme.ts`：

```typescript
import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as Theme) || 'light';
  });

  // 初始化时应用主题
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return { theme, setTheme, toggleTheme };
}
```

- [ ] **Step 2: 更新 hooks 导出**

修改 `src/hooks/index.ts`，添加导出：

```typescript
export { useAutoPlay } from './useAutoPlay';
export { useRipple } from './useRipple';
export { useMascotTheme } from './useMascotTheme';
export { useTheme } from './useTheme';
export type { Theme } from './useTheme';
```

- [ ] **Step 3: 验证构建**

```bash
npm run build
```

Expected: 构建成功

- [ ] **Step 4: 提交主题 Hook**

```bash
git add src/hooks/useTheme.ts src/hooks/index.ts
git commit -m "feat(theme): 添加 useTheme 主题切换 Hook"
```

---

### Task 3: TopBar 切换按钮

**Files:**
- Modify: `src/components/TopBar/TopBar.tsx`

- [ ] **Step 1: 添加切换按钮到 TopBar**

修改 `src/components/TopBar/TopBar.tsx`，完整代码：

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { useTheme } from '../../hooks';

export function TopBar() {
  const { progress } = useGameStore();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full max-w-[1120px] mx-auto px-5">
      <div className="bg-theme-bg-container rounded-[30px] border-2 border-theme-border px-6 py-3 flex items-center justify-between shadow-sm transition-colors">
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
              className="text-2xl font-extrabold text-mascot-600"
            >
              {progress.stars}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* 标题 */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-mascot-600">
            🌈 宝宝单词乐园 🌈
          </h1>
        </div>

        {/* 右侧：主题切换 + 连续学习天数 */}
        <div className="flex items-center gap-3">
          {/* 主题切换按钮 */}
          <motion.button
            onClick={toggleTheme}
            className="w-10 h-10 bg-mascot-100 rounded-full flex items-center justify-center hover:bg-mascot-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={theme === 'dark' ? '切换到日间模式' : '切换到夜间模式'}
          >
            <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
          </motion.button>

          {/* 连续学习天数 */}
          <div className="flex items-center gap-2 bg-mascot-100 rounded-full px-4 py-2">
            <span className="text-xl">🔥</span>
            <span className="text-sm font-semibold text-mascot-600">
              连续学习 {progress.streak} 天
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

- [ ] **Step 3: 提交切换按钮**

```bash
git add src/components/TopBar/TopBar.tsx
git commit -m "feat(theme): TopBar 添加夜间模式切换按钮"
```

---

### Task 4: 页面背景适配

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/GamePage.tsx`

- [ ] **Step 1: 修改 HomePage 背景**

修改 `src/pages/HomePage.tsx`，将背景色和装饰改为使用主题变量：

```tsx
import { motion } from 'framer-motion';
import { TopBar } from '../components/TopBar';
import { CategoryList } from '../components/CategoryList';
import { ProgressBar } from '../components/ProgressBar';
import { Mascot, MascotSelector } from '../components/Mascot';

export function HomePage() {
  return (
    <div className="min-h-screen bg-theme-bg flex flex-col">
      {/* 背景装饰 - 使用主题变量 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[200px] w-[350px] h-[350px] bg-theme-decoration-1 rounded-full opacity-30" />
        <div className="absolute top-[630px] right-[70px] w-[400px] h-[400px] bg-theme-decoration-2 rounded-full opacity-30" />
        <div className="absolute top-[50px] right-[50px] w-[300px] h-[300px] bg-theme-decoration-3 rounded-full opacity-40" />
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

        {/* 吉祥物选择器 */}
        <div className="py-2">
          <MascotSelector />
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

- [ ] **Step 2: 修改 GamePage 背景**

修改 `src/pages/GamePage.tsx`，将背景色和装饰改为使用主题变量：

```tsx
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
    <div className="min-h-screen bg-theme-bg flex flex-col">
      {/* 背景装饰 - 使用主题变量 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[200px] w-[350px] h-[350px] bg-theme-decoration-1 rounded-full opacity-30" />
        <div className="absolute top-[630px] right-[70px] w-[400px] h-[400px] bg-theme-decoration-2 rounded-full opacity-30" />
        <div className="absolute top-[50px] right-[50px] w-[300px] h-[300px] bg-theme-decoration-3 rounded-full opacity-40" />
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
            className="hidden lg:block w-[280px]"
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

- [ ] **Step 3: 验证构建**

```bash
npm run build
```

Expected: 构建成功

- [ ] **Step 4: 提交页面背景适配**

```bash
git add src/pages/HomePage.tsx src/pages/GamePage.tsx
git commit -m "feat(theme): 页面背景适配夜间模式"
```

---

### Task 5: 组件主题适配

**Files:**
- Modify: `src/components/CategoryList/CategoryList.tsx`
- Modify: `src/components/WordCard/WordCard.tsx`
- Modify: `src/components/Mascot/MascotSelector.tsx`
- Modify: `src/components/ProgressBar/ProgressBar.tsx`
- Modify: `src/components/CompleteModal/CompleteModal.tsx`

- [ ] **Step 1: 修改 CategoryList**

修改 `src/components/CategoryList/CategoryList.tsx`，将容器背景改为主题变量：

关键变更：
- `bg-white` → `bg-theme-bg-container`
- `border-primary-200` → `border-theme-border`
- `text-primary-600` → `text-mascot-600`

```tsx
// 第 24 行
<div className="bg-theme-bg-container rounded-[30px] border-2 border-theme-border p-4 shadow-sm transition-colors">
  <h3 className="text-base font-bold text-mascot-600 mb-3 text-center">
```

- [ ] **Step 2: 修改 WordCard**

修改 `src/components/WordCard/WordCard.tsx`，关键变更：

```tsx
// 第 63 行
<span className="text-mascot-600 font-bold text-sm">

// 第 66 行
<span className="text-mascot-600 font-bold text-sm">

// 第 70 行
<div className="h-2 bg-mascot-100 rounded-full overflow-hidden">

// 第 96 行
className="w-[440px] bg-theme-bg-container rounded-[40px] border-[3px] border-theme-border p-8 shadow-lg transition-colors"

// 第 106 行
className="w-[320px] h-[260px] bg-mascot-50 rounded-[40px] border-[3px] border-mascot-200 mx-auto flex items-center justify-center relative overflow-hidden"

// 第 126 行
className="text-mascot-600 text-[56px] font-extrabold mb-2"
```

- [ ] **Step 3: 修改 MascotSelector**

读取当前文件内容后修改背景：

```bash
cat src/components/Mascot/MascotSelector.tsx
```

关键变更：容器背景 `bg-white` → `bg-theme-bg-container`

- [ ] **Step 4: 修改 ProgressBar**

读取当前文件内容后修改背景。

关键变更：容器背景改为主题变量。

- [ ] **Step 5: 修改 CompleteModal**

读取当前文件内容后修改背景。

关键变更：弹窗背景改为主题变量。

- [ ] **Step 6: 验证构建**

```bash
npm run build
```

Expected: 构建成功

- [ ] **Step 7: 提交组件适配**

```bash
git add src/components/CategoryList/CategoryList.tsx \
        src/components/WordCard/WordCard.tsx \
        src/components/Mascot/MascotSelector.tsx \
        src/components/ProgressBar/ProgressBar.tsx \
        src/components/CompleteModal/CompleteModal.tsx
git commit -m "feat(theme): 组件适配夜间模式"
```

---

### Task 6: 验证与提交

**Files:**
- None (验证阶段)

- [ ] **Step 1: 完整构建验证**

```bash
npm run build
```

Expected: 构建成功，无错误

- [ ] **Step 2: 功能验证清单**

手动验证以下功能：

1. [ ] 点击切换按钮可在日间/夜间模式切换
2. [ ] 夜间模式使用柔和暗色配色（深蓝紫背景）
3. [ ] 吉祥物主题色在夜间模式下保留
4. [ ] 刷新页面后主题保持
5. [ ] 300ms 平滑过渡动画
6. [ ] 所有页面和组件正确适配

- [ ] **Step 3: 最终提交（如有遗漏）**

```bash
git status
# 如有未提交的文件
git add -A
git commit -m "feat(theme): 夜间模式功能完成"
```

---

## 验收标准

- [ ] 点击切换按钮可在日间/夜间模式切换
- [ ] 夜间模式使用柔和暗色配色
- [ ] 吉祥物主题色在夜间模式下保留
- [ ] 刷新页面后主题保持
- [ ] 300ms 平滑过渡动画
- [ ] 所有页面和组件正确适配
