# 夜间模式优化设计文档

## 概述

优化宝宝单词乐园现有夜间模式实现，解决视觉遗漏、性能问题、功能缺失和代码不一致。

## 问题清单

### 视觉遗漏
- Mascot 对话气泡 `bg-white` 硬编码
- WordCard 中文 `text-gray-500`、音标 `text-gray-400` 未适配
- WordCard 播放指示器、箭头、Space 提示全部硬编码颜色

### 性能问题
- `index.css` 全局 `* { transition }` 对所有元素生效，干扰 framer-motion 动画

### 功能缺失
- 不支持跟随系统 `prefers-color-scheme`

### 代码不一致
- `useTheme`（useState + localStorage）和 `useMascotTheme`（zustand + localStorage）管理模式不同
- 多组件调用 `useTheme` 产生多份独立状态

## 技术方案

### 1. 状态管理重构

将 `theme` 合入 `useGameStore`（zustand），和 `mascot` 同级：

```typescript
// useGameStore 新增
theme: Theme;          // 'light' | 'dark'
setTheme: (theme: Theme) => void;
toggleTheme: () => void;
```

`setTheme` 内部同步：
- `set({ theme })`
- `localStorage.setItem('theme', theme)`
- `document.documentElement.setAttribute('data-theme', theme)`

初始化逻辑：
1. 读 `localStorage.getItem('theme')`
2. 无存储值时读 `window.matchMedia('(prefers-color-scheme: dark)')`
3. 默认 `'light'`

删除 `src/hooks/useTheme.ts`，`hooks/index.ts` 移除导出。

### 2. 全局 transition 修复

删除 `index.css` 中的全局规则：

```css
/* 删除 */
* {
  transition-property: background-color, border-color, color;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
}
```

改为在需要主题过渡的元素上使用 Tailwind `transition-colors`（已有的保留，缺少的补上）。

### 3. 视觉适配

| 组件 | 当前值 | 改为 |
|------|--------|------|
| Mascot 对话气泡 | `bg-white` | `bg-theme-bg-container` |
| Mascot 对话气泡边框 | `border-mascot-200` | `border-theme-border` |
| WordCard 中文 | `text-gray-500` | `text-theme-text-secondary` |
| WordCard 音标 | `text-gray-400` | `text-theme-text-muted` |
| WordCard 播放指示器（EN 未激活） | `bg-primary-100` | `bg-mascot-100` |
| WordCard 播放指示器（ZH 未激活） | `bg-pink-100` | `bg-mascot-100` |
| WordCard 箭头 | `text-primary-600` | `text-mascot-600` |
| WordCard Space 提示键 | `bg-gray-100 border-gray-300` | `bg-theme-bg-card border-theme-border` |
| WordCard Space 提示文字 | `text-gray-600` | `text-theme-text-secondary` |
| WordCard Space 提示说明 | `text-gray-400` | `text-theme-text-muted` |

### 4. 系统主题跟随

初始化时检测系统偏好：
```typescript
const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored) return stored;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};
```

用户手动切换后 localStorage 记录覆盖系统偏好。不新增 "auto" 模式，保持 `'light' | 'dark'` 两态。

## 修改文件清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/store/useGameStore.ts` | 修改 | 新增 theme/setTheme/toggleTheme |
| `src/hooks/useTheme.ts` | 删除 | 功能迁入 store |
| `src/hooks/index.ts` | 修改 | 移除 useTheme 导出 |
| `src/index.css` | 修改 | 删除全局 transition 规则 |
| `src/components/TopBar/TopBar.tsx` | 修改 | 改用 store 获取 theme |
| `src/components/Mascot/Mascot.tsx` | 修改 | 对话气泡适配暗色 |
| `src/components/WordCard/WordCard.tsx` | 修改 | 文字/播放指示器/Space 提示适配 |
| `src/components/NavButtons/NavButtons.tsx` | 检查 | 如有硬编码则修复 |

## 验收标准

- 切换夜间模式后所有组件视觉正确，无刺眼白色区域
- framer-motion 动画不受 transition 干扰
- 首次访问时跟随系统 dark/light 偏好
- 手动切换后刷新页面保持选择
- theme 状态全局单一数据源（zustand store）
