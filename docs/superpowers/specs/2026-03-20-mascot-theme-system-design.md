# 吉祥物与主题系统设计

> **目标**：扩展吉祥物表情系统，实现 4 个可切换角色及配套主题配色

**技术栈**：React + TypeScript + Tailwind CSS + Framer Motion + Fluent UI Emoji

---

## 一、角色定义

### 1.1 吉祥物配置

| ID | 名称 | Fluent Emoji 基 | 主色 | 背景色 |
|---|------|----------------|------|--------|
| `cat` | 小紫猫 | Cat Face | `#8B5CF6` | `#FEF7FF` |
| `rabbit` | 小粉兔 | Rabbit Face | `#EC4899` | `#FDF2F8` |
| `bear` | 小蓝熊 | Bear | `#3B82F6` | `#EFF6FF` |
| `duck` | 小黄鸭 | Duck | `#F59E0B` | `#FFFBEB` |

### 1.2 完整配色方案

每个吉祥物包含 7 级色阶（对应 Tailwind primary 色阶）：

**小紫猫（默认）**
```
50:  #FEF7FF
100: #F3E8FF
200: #E9D5FF
300: #D8B4FE
400: #C084FC
500: #A855F7
600: #8B5CF6
700: #7C3AED
```

**小粉兔**
```
50:  #FDF2F8
100: #FCE7F3
200: #FBCFE8
300: #F9A8D4
400: #F472B6
500: #EC4899
600: #DB2777
700: #BE185D
```

**小蓝熊**
```
50:  #EFF6FF
100: #DBEAFE
200: #BFDBFE
300: #93C5FD
400: #60A5FA
500: #3B82F6
600: #2563EB
700: #1D4ED8
```

**小黄鸭**
```
50:  #FFFBEB
100: #FEF3C7
200: #FDE68A
300: #FCD34D
400: #FBBF24
500: #F59E0B
600: #D97706
700: #B45309
```

---

## 二、状态表情系统

### 2.1 状态定义

| 状态 | 场景 | 触发条件 | 持续时间 |
|------|------|----------|----------|
| `idle` | 待机 | 首页、无操作 | 持续 |
| `learning` | 学习中 | `isPlaying === true` | 播放期间 |
| `happy` | 开心 | 单词播放完成 | 1.5 秒后恢复 |
| `celebrate` | 庆祝 | 分类完成 / 今日目标完成 | 弹窗关闭后恢复 |

### 2.2 表情资源映射

每个角色需要 4 张 Fluent UI Emoji SVG：

| 状态 | 表情类型 | Fluent Emoji 示例 |
|------|----------|-------------------|
| `idle` | 微笑/眨眼 | Cat Face (Default) |
| `learning` | 专注/张嘴 | Cat Face (Open Mouth) / Smiling Cat |
| `happy` | 开心/星星眼 | Smiling Cat with Heart-Eyes / Star-Struck |
| `celebrate` | 庆祝/撒花 | Partying Face / Cat with Party Hat |

### 2.3 表情切换动画

| 切换 | 动画效果 | 时长 |
|------|----------|------|
| idle → learning | scale 弹入 | 200ms |
| learning → happy | 淡入 + translateY(-8px) | 250ms |
| happy → idle | 淡出 | 150ms |
| → celebrate | 弹跳 + scale 脉冲 | 300ms |

---

## 三、主题切换机制

### 3.1 CSS 变量方案

使用 CSS 变量实现运行时主题切换，避免 Tailwind 编译时限制：

```css
/* index.css */
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
  /* ... */
}

[data-mascot="bear"] {
  --color-mascot-50: #EFF6FF;
  /* ... */
}

[data-mascot="duck"] {
  --color-mascot-50: #FFFBEB;
  /* ... */
}
```

### 3.2 Tailwind 配置

```javascript
// tailwind.config.js
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
}
```

### 3.3 组件迁移

将现有 `primary-*` 色替换为 `mascot-*`：

| 组件 | 需修改位置 |
|------|-----------|
| Mascot | 背景、气泡、文字色 |
| TopBar | 标题、星星图标 |
| WordCard | 装饰元素 |
| CategoryList | 选中状态 |
| CompleteModal | 按钮、装饰 |
| ProgressBar | 进度条填充 |

### 3.4 主题切换 Hook

```typescript
// useMascotTheme.ts
export function useMascotTheme() {
  const [mascot, setMascot] = useLocalStorage<'cat' | 'rabbit' | 'bear' | 'duck'>('mascot', 'cat');

  useEffect(() => {
    document.documentElement.setAttribute('data-mascot', mascot);
  }, [mascot]);

  return { mascot, setMascot };
}
```

---

## 四、吉祥物选择器 UI

### 4.1 位置

首页底部，ProgressBar 上方

### 4.2 布局

```
┌─────────────────────────────────────────────────┐
│              选择你的小伙伴                       │
│                                                 │
│    ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐       │
│    │  😺  │  │  🐰  │  │  🐻  │  │  🐤  │       │
│    │ 小紫猫│  │ 小粉兔│  │ 小蓝熊│  │ 小黄鸭│       │
│    └──────┘  └──────┘  └──────┘  └──────┘       │
│       ✓                            ← 当前选中    │
└─────────────────────────────────────────────────┘
```

### 4.3 交互

- **选中状态**：彩色边框（mascot-600）+ 右下角勾选图标
- **悬停效果**：轻微上浮 + 阴影增强
- **切换动画**：头像弹跳（scale 1 → 1.1 → 1）
- **主题过渡**：全局配色平滑过渡（transition: background-color 300ms）

### 4.4 首次使用引导

新用户首次进入时：
1. 显示选择引导遮罩
2. 高亮选择器区域
3. 用户选择后关闭引导

---

## 五、状态管理

### 5.1 Store 扩展

```typescript
// useGameStore.ts 新增
interface GameState {
  // ... 现有状态
  mascot: 'cat' | 'rabbit' | 'bear' | 'duck';
  mascotState: 'idle' | 'learning' | 'happy' | 'celebrate';
  setMascot: (mascot: string) => void;
  setMascotState: (state: string) => void;
}
```

### 5.2 状态流转

```
首页加载 → idle
      ↓
开始播放 → learning
      ↓
播放结束 → happy (1.5s) → idle
      ↓
分类完成 → celebrate → 弹窗关闭 → idle
```

---

## 六、文件结构

```
src/
  assets/
    mascots/                    # 新增
      cat/
        idle.svg
        learning.svg
        happy.svg
        celebrate.svg
      rabbit/
        idle.svg
        learning.svg
        happy.svg
        celebrate.svg
      bear/
        idle.svg
        learning.svg
        happy.svg
        celebrate.svg
      duck/
        idle.svg
        learning.svg
        happy.svg
        celebrate.svg
  components/
    Mascot/
      Mascot.tsx               # 重构
      MascotSelector.tsx       # 新增
      mascotConfig.ts          # 新增
      index.ts                 # 更新导出
  hooks/
    useMascotTheme.ts          # 新增
    index.ts                   # 更新导出
  store/
    useGameStore.ts            # 修改
  types/
    index.ts                   # 新增 Mascot 类型
  index.css                    # 修改：CSS 变量
  tailwind.config.js           # 修改：mascot 色
```

---

## 七、任务清单

### 阶段 1：资源准备
- [ ] 下载 Fluent UI Emoji SVG 文件（16 个文件）
- [ ] 整理到 `src/assets/mascots/` 目录
- [ ] 创建 `mascotConfig.ts` 配置文件

### 阶段 2：主题系统
- [ ] 添加 CSS 变量到 `index.css`
- [ ] 更新 `tailwind.config.js` mascot 色
- [ ] 创建 `useMascotTheme` Hook

### 阶段 3：组件迁移
- [ ] 迁移 Mascot 组件（primary → mascot）
- [ ] 迁移 TopBar 组件
- [ ] 迁移 WordCard 组件
- [ ] 迁移 CategoryList 组件
- [ ] 迁移 CompleteModal 组件
- [ ] 迁移 ProgressBar 组件

### 阶段 4：表情系统
- [ ] 重构 Mascot 组件支持状态表情
- [ ] 添加表情切换动画
- [ ] 集成状态触发逻辑

### 阶段 5：选择器
- [ ] 创建 MascotSelector 组件
- [ ] 添加到首页
- [ ] 实现 localStorage 持久化
- [ ] 添加切换动画

### 阶段 6：测试验证
- [ ] 构建验证
- [ ] 浏览器功能测试
- [ ] 主题切换测试
- [ ] 表情切换测试

---

## 八、风险与备选方案

| 风险 | 备选方案 |
|------|----------|
| Fluent Emoji SVG 加载慢 | 使用 Vite 导入，打包优化 |
| CSS 变量兼容性 | 现代浏览器均支持，无需备选 |
| 主题切换闪烁 | 添加 transition 平滑过渡 |
