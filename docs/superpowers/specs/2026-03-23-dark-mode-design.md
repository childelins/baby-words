# 夜间模式设计文档

## 概述

为宝宝单词乐园添加夜间切换模式，采用柔和暗色风格，手动按钮切换，保持吉祥物主题色作为点缀。

## 技术方案

### 主题架构

扩展现有 `data-mascot` 机制，叠加 `data-theme` 属性：

```css
:root {
  /* 日间模式（默认） */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: var(--color-mascot-50);
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;
}

[data-theme="dark"] {
  /* 夜间模式 */
  --color-bg-primary: #1a1a2e;
  --color-bg-secondary: #16213e;
  --color-text-primary: #e0e0e0;
  --color-text-secondary: #a0a0a0;
}
```

### 配色方案

#### 夜间模式色板

| 用途 | CSS 变量 | 值 |
|------|----------|-----|
| 主背景 | `--color-bg-primary` | `#1a1a2e` |
| 次背景 | `--color-bg-secondary` | `#16213e` |
| 卡片背景 | `--color-bg-card` | `#0f3460` |
| 主文字 | `--color-text-primary` | `#e0e0e0` |
| 次文字 | `--color-text-secondary` | `#a0a0a0` |
| 边框 | `--color-border` | `#2d3748` |
| 装饰圆 | `--color-decoration-1` | `#2d2d44` |
| 装饰圆 | `--color-decoration-2` | `#3d2d44` |
| 装饰圆 | `--color-decoration-3` | `#2d3d44` |

#### 保留吉祥物色

夜间模式下保留吉祥物主题色用于：
- 按钮/进度条背景
- 文字强调色
- 选中状态边框

### 组件变更

#### 新建文件

| 文件 | 说明 |
|------|------|
| `src/hooks/useTheme.ts` | 主题切换 Hook |

#### 修改文件

| 文件 | 变更 |
|------|------|
| `src/index.css` | 添加夜间模式 CSS 变量 |
| `src/hooks/index.ts` | 导出 useTheme |
| `src/components/TopBar/TopBar.tsx` | 添加切换按钮 |
| `src/pages/HomePage.tsx` | 背景装饰使用变量 |
| `src/pages/GamePage.tsx` | 背景装饰使用变量 |
| `src/components/CategoryList/CategoryList.tsx` | 使用主题变量 |
| `src/components/WordCard/WordCard.tsx` | 使用主题变量 |
| `tailwind.config.js` | 添加 dark 色配置 |

### 切换按钮

**位置**：TopBar 右侧，连续学习天数左侧

**组件**：
```tsx
<button
  onClick={toggleTheme}
  className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center"
>
  {theme === 'dark' ? '☀️' : '🌙'}
</button>
```

**交互**：
- 点击立即切换
- 300ms 过渡动画（复用现有 CSS transition）
- localStorage 持久化

### Hook 设计

```typescript
// src/hooks/useTheme.ts
type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme');
    return (stored as Theme) || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return { theme, setTheme, toggleTheme };
}
```

## Tailwind 集成

```javascript
// tailwind.config.js
colors: {
  dark: {
    bg: 'var(--color-bg-primary)',
    'bg-secondary': 'var(--color-bg-secondary)',
    'bg-card': 'var(--color-bg-card)',
    text: 'var(--color-text-primary)',
    'text-secondary': 'var(--color-text-secondary)',
    border: 'var(--color-border)',
  },
}
```

## 实现步骤

### Task 1: CSS 变量系统
- 1.1 在 `index.css` 添加日间/夜间模式变量
- 1.2 在 `tailwind.config.js` 添加 dark 色配置

### Task 2: 主题 Hook
- 2.1 创建 `useTheme.ts`
- 2.2 更新 `hooks/index.ts` 导出

### Task 3: 切换按钮
- 3.1 修改 `TopBar.tsx` 添加切换按钮

### Task 4: 组件适配
- 4.1 修改 `HomePage.tsx` 背景装饰
- 4.2 修改 `GamePage.tsx` 背景装饰
- 4.3 修改 `CategoryList.tsx` 卡片背景
- 4.4 修改 `WordCard.tsx` 卡片背景
- 4.5 修改 `TopBar.tsx` 容器背景

### Task 5: 验证与提交
- 5.1 构建验证
- 5.2 功能验证
- 5.3 提交变更

## 验收标准

- [ ] 点击切换按钮可在日间/夜间模式切换
- [ ] 夜间模式使用柔和暗色配色
- [ ] 吉祥物主题色在夜间模式下保留
- [ ] 刷新页面后主题保持
- [ ] 300ms 平滑过渡动画
- [ ] 所有页面和组件正确适配
