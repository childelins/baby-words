# 夜间模式优化实现计划

> **For agentic workers:** REQUIRED SKILL: Use planning-with-files to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 优化现有夜间模式，修复视觉遗漏、性能问题，统一状态管理，添加系统主题跟随。

**Architecture:** 将 theme 状态从独立 hook（useState）迁入 zustand store，与 mascot 状态统一管理；移除全局 transition 规则改为精准元素级过渡；修复所有硬编码颜色为主题变量。

**Tech Stack:** React 18, TypeScript, Zustand, Tailwind CSS, CSS Variables

---

## 文件结构

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/store/useGameStore.ts` | 修改 | 新增 theme/setTheme/toggleTheme |
| `src/hooks/useTheme.ts` | 删除 | 功能迁入 store |
| `src/hooks/index.ts` | 修改 | 移除 useTheme 导出 |
| `src/index.css` | 修改 | 删除全局 `*` transition 规则 |
| `src/components/TopBar/TopBar.tsx` | 修改 | 改用 store 获取 theme |
| `src/components/Mascot/Mascot.tsx` | 修改 | 对话气泡适配暗色 |
| `src/components/WordCard/WordCard.tsx` | 修改 | 文字/播放指示器/Space 提示适配 |
| `src/components/NavButtons/NavButtons.tsx` | 修改 | 按钮背景/文字适配暗色 |

---

### Task 1: 状态管理重构

**Files:**
- Modify: `src/store/useGameStore.ts`
- Delete: `src/hooks/useTheme.ts`
- Modify: `src/hooks/index.ts`

- [ ] **Step 1: 在 useGameStore 添加 Theme 类型和初始化函数**

在 `src/store/useGameStore.ts` 顶部 import 区域后添加：

```typescript
type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored) return stored;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};
```

- [ ] **Step 2: 在 GameState interface 添加 theme 字段和 actions**

在 `interface GameState` 的 `// 吉祥物` 注释区域后添加：

```typescript
  // 主题
  theme: Theme;

  // ... existing Actions section, add:
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
```

- [ ] **Step 3: 在 store 实现中添加 theme 初始值和 actions**

在 `create<GameState>` 的初始值区域添加：

```typescript
  theme: (() => {
    const t = getInitialTheme();
    document.documentElement.setAttribute('data-theme', t);
    return t;
  })(),
```

在 actions 区域（`setMascotState` 之后）添加：

```typescript
  setTheme: (theme: Theme) => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },

  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    get().setTheme(newTheme);
  },
```

- [ ] **Step 4: 删除 useTheme.ts 并更新 hooks/index.ts**

删除 `src/hooks/useTheme.ts`。

修改 `src/hooks/index.ts`，移除 useTheme 相关行，最终内容：

```typescript
export { useAutoPlay } from './useAutoPlay';
export { useRipple } from './useRipple';
export { useMascotTheme } from './useMascotTheme';
```

- [ ] **Step 5: 验证构建**

```bash
npm run build
```

Expected: 构建失败（TopBar 仍引用 useTheme），确认 store 变更本身无语法错误后继续

- [ ] **Step 6: 提交状态管理重构**

```bash
git add src/store/useGameStore.ts src/hooks/index.ts
git rm src/hooks/useTheme.ts
git commit -m "refactor(theme): 将 theme 状态迁入 zustand store，删除 useTheme hook"
```

---

### Task 2: 移除全局 transition + TopBar 适配

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/TopBar/TopBar.tsx`

- [ ] **Step 1: 删除全局 transition 规则**

在 `src/index.css` 中删除第 79-84 行的全局 transition 规则：

```css
/* 删除这整块 */
* {
  transition-property: background-color, border-color, color;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
}
```

- [ ] **Step 2: 修改 TopBar 改用 store**

修改 `src/components/TopBar/TopBar.tsx`：

将 import 行：
```typescript
import { useTheme } from '../../hooks';
```

改为不导入 useTheme，在组件内从 store 获取：

```typescript
// 移除: import { useTheme } from '../../hooks';
```

将组件内：
```typescript
const { theme, toggleTheme } = useTheme();
```

改为：
```typescript
const theme = useGameStore((s) => s.theme);
const toggleTheme = useGameStore((s) => s.toggleTheme);
```

- [ ] **Step 3: 验证构建**

```bash
npm run build
```

Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
git add src/index.css src/components/TopBar/TopBar.tsx
git commit -m "fix(theme): 移除全局 transition 规则，TopBar 改用 store 获取主题"
```

---

### Task 3: Mascot 视觉适配

**Files:**
- Modify: `src/components/Mascot/Mascot.tsx`

- [ ] **Step 1: 修改对话气泡背景和边框**

在 `src/components/Mascot/Mascot.tsx` 第 73 行，将：

```tsx
className="bg-white rounded-2xl border-2 border-mascot-200 px-4 py-3 shadow-sm max-w-[180px]"
```

改为：

```tsx
className="bg-theme-bg-container rounded-2xl border-2 border-theme-border px-4 py-3 shadow-sm max-w-[180px] transition-colors"
```

- [ ] **Step 2: 验证构建**

```bash
npm run build
```

Expected: 构建成功

- [ ] **Step 3: 提交**

```bash
git add src/components/Mascot/Mascot.tsx
git commit -m "fix(theme): Mascot 对话气泡适配夜间模式"
```

---

### Task 4: WordCard 视觉适配

**Files:**
- Modify: `src/components/WordCard/WordCard.tsx`

- [ ] **Step 1: 修改中文和音标文字颜色**

第 132 行，将 `text-gray-500` 改为 `text-theme-text-secondary`：

```tsx
className="text-theme-text-secondary text-[28px] font-semibold mb-1"
```

第 138 行，将 `text-gray-400` 改为 `text-theme-text-muted`：

```tsx
className="text-theme-text-muted text-base"
```

- [ ] **Step 2: 修改播放指示器颜色**

第 151 行，EN 未激活态 `bg-primary-100` 改为 `bg-mascot-100`：

```tsx
isPlayingEn ? 'bg-mascot-600' : 'bg-mascot-100'
```

第 162 行，SoundWave 未激活色 `bg-primary-600` 改为 `bg-mascot-600`：

```tsx
color={isPlayingEn ? 'bg-white' : 'bg-mascot-600'}
```

第 165 行，文字未激活色 `text-primary-600` 改为 `text-mascot-600`：

```tsx
isPlayingEn ? 'text-white' : 'text-mascot-600'
```

第 171 行，箭头 `text-primary-600` 改为 `text-mascot-600`：

```tsx
<span className="text-mascot-600 text-lg">→</span>
```

第 175 行，ZH 未激活态 `bg-pink-100` 改为 `bg-mascot-100`：

```tsx
isPlayingZh ? 'bg-mascot-600' : 'bg-mascot-100'
```

第 186 行，SoundWave 未激活色 `bg-pink-600` 改为 `bg-mascot-600`：

```tsx
color={isPlayingZh ? 'bg-white' : 'bg-mascot-600'}
```

第 189 行，文字未激活色 `text-pink-600` 改为 `text-mascot-600`：

```tsx
isPlayingZh ? 'text-white' : 'text-mascot-600'
```

- [ ] **Step 3: 修改 Space 键提示**

第 198 行，将：

```tsx
<div className="w-20 h-8 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
  <span className="text-gray-600 font-semibold text-xs">Space</span>
</div>
<span className="text-gray-400 font-medium text-sm">重复播放发音</span>
```

改为：

```tsx
<div className="w-20 h-8 bg-theme-bg-card rounded-lg border border-theme-border flex items-center justify-center transition-colors">
  <span className="text-theme-text-secondary font-semibold text-xs">Space</span>
</div>
<span className="text-theme-text-muted font-medium text-sm">重复播放发音</span>
```

- [ ] **Step 4: 验证构建**

```bash
npm run build
```

Expected: 构建成功

- [ ] **Step 5: 提交**

```bash
git add src/components/WordCard/WordCard.tsx
git commit -m "fix(theme): WordCard 文字/播放指示器/Space 提示适配夜间模式"
```

---

### Task 5: NavButtons 视觉适配

**Files:**
- Modify: `src/components/NavButtons/NavButtons.tsx`

- [ ] **Step 1: 修改上一个按钮背景和文字**

第 18-21 行，将 `bg-gray-100` 改为 `bg-theme-bg-card`，添加 `transition-colors`：

```tsx
className={`w-[100px] h-[120px] rounded-3xl flex flex-col items-center justify-center gap-1 shadow-md transition-colors ${
  isFirstWord
    ? 'bg-theme-bg-card opacity-50 cursor-not-allowed'
    : 'bg-theme-bg-card hover:bg-mascot-100'
}`}
```

第 27 行，将 `text-gray-500` 改为 `text-theme-text-secondary`：

```tsx
<span className="text-theme-text-secondary font-semibold text-sm">上一个</span>
```

第 28 行，将 `text-gray-400` 改为 `text-theme-text-muted`：

```tsx
<span className="text-theme-text-muted font-medium text-xs">←</span>
```

- [ ] **Step 2: 修改主页按钮**

第 34 行，将 `bg-primary-600` 改为 `bg-mascot-600`：

```tsx
className="w-[120px] h-[120px] bg-mascot-600 rounded-3xl flex flex-col items-center justify-center gap-1 shadow-lg"
```

- [ ] **Step 3: 验证构建**

```bash
npm run build
```

Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
git add src/components/NavButtons/NavButtons.tsx
git commit -m "fix(theme): NavButtons 适配夜间模式"
```

---

### Task 6: 最终验证

**Files:**
- None（验证阶段）

- [ ] **Step 1: 完整构建验证**

```bash
npm run build
```

Expected: 构建成功，无错误

- [ ] **Step 2: 功能验证清单**

手动验证：

1. 点击切换按钮，日间/夜间模式切换
2. 夜间模式下无刺眼白色区域（特别检查：Mascot 气泡、WordCard 中文/音标、Space 提示、NavButtons）
3. 播放指示器颜色跟随吉祥物主题色
4. framer-motion 动画流畅（卡片切换、吉祥物呼吸、完成弹窗弹出）
5. 刷新页面后主题保持
6. 清除 localStorage 后首次访问跟随系统 dark/light 偏好
