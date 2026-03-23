# 夜间模式设计

> **目标**：为宝宝单词乐园添加夜间模式切换功能，包含完整设置页面

**技术栈**：React + TypeScript + Tailwind CSS + Zustand + React Router

---

## 一、功能范围

| 功能 | 说明 |
|------|------|
| 夜间模式切换 | 手动开关，立即生效 |
| 音量调节 | TTS 音量滑块，0-100% |
| 进度重置 | 清除学习进度，需确认 |
| 关于信息 | 应用版本和描述 |

---

## 二、架构设计

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                        App                                   │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │   HomePage      │  │   SettingsPage  │  ← 新增          │
│  │  ┌───────────┐  │  │  ┌───────────┐  │                   │
│  │  │ TopBar    │──┼──┼─→│ 设置图标   │  │                   │
│  │  │ (齿轮图标) │  │  │  │ 夜间模式   │  │                   │
│  │  └───────────┘  │  │  │ 音量调节   │  │                   │
│  │                 │  │  │ 进度重置   │  │                   │
│  │  ...            │  │  │ 关于信息   │  │                   │
│  │                 │  │  └───────────┘  │                   │
│  └─────────────────┘  └─────────────────┘                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Theme System                        │   │
│  │  useSettings() Hook                                  │   │
│  │  data-mascot="cat" data-theme="dark"                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 路由规划

```typescript
// 现有路由
<Route path="/" element={<HomePage />} />
<Route path="/game" element={<GamePage />} />

// 新增路由
<Route path="/settings" element={<SettingsPage />} />
```

---

## 三、夜间配色方案

### 3.1 配色原则

- 50-200：深色背景层（卡片、区域背景）
- 300-500：中调色（边框、次要元素）
- 600-700：亮色层（文字、图标、强调）

### 3.2 小紫猫（夜间版）

```css
[data-mascot="cat"][data-theme="dark"] {
  --color-mascot-50: #1a1625;   /* 背景 - 深紫黑 */
  --color-mascot-100: #2d2640;
  --color-mascot-200: #3d3555;
  --color-mascot-300: #5a4d7a;
  --color-mascot-400: #7c6ba3;
  --color-mascot-500: #9d8bc7;
  --color-mascot-600: #b8a9db;  /* 主要文字/图标 */
  --color-mascot-700: #d4c9eb;  /* 高亮文字 */
}
```

### 3.3 小粉兔（夜间版）

```css
[data-mascot="rabbit"][data-theme="dark"] {
  --color-mascot-50: #1f161a;
  --color-mascot-100: #3a2a32;
  --color-mascot-200: #4f3d46;
  --color-mascot-300: #7a5a6a;
  --color-mascot-400: #a37a8d;
  --color-mascot-500: #c9a0b0;
  --color-mascot-600: #dbb8c6;
  --color-mascot-700: #edd0da;
}
```

### 3.4 小蓝熊（夜间版）

```css
[data-mascot="bear"][data-theme="dark"] {
  --color-mascot-50: #121820;
  --color-mascot-100: #1e2a3a;
  --color-mascot-200: #2a3d52;
  --color-mascot-300: #4a6080;
  --color-mascot-400: #6a85a5;
  --color-mascot-500: #8aa5c5;
  --color-mascot-600: #a5bfd8;
  --color-mascot-700: #c5d9ea;
}
```

### 3.5 小黄鸭（夜间版）

```css
[data-mascot="duck"][data-theme="dark"] {
  --color-mascot-50: #1c1810;
  --color-mascot-100: #352a18;
  --color-mascot-200: #4a3d25;
  --color-mascot-300: #756040;
  --color-mascot-400: #a08560;
  --color-mascot-500: #c5a580;
  --color-mascot-600: #d5bc9a;
  --color-mascot-700: #e5d5b8;
}
```

---

## 四、设置页设计

### 4.1 页面布局

```
┌─────────────────────────────────────────────────┐
│  ← 设置                                          │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │  🌙 夜间模式                              │    │
│  │  ──────────────────────── [开关]        │    │
│  │  深色主题，保护眼睛                       │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │  🔊 音量调节                              │    │
│  │  ───────────────────────────────        │    │
│  │  [━━━━━━━━━━━━●━━━━━━━━━] 80%           │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │  🗑️ 进度重置                              │    │
│  │  ──────────────────────── [重置]        │    │
│  │  清除所有学习进度和积分                   │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │  ℹ️ 关于                                  │    │
│  │  ───────────────────────────────        │    │
│  │  宝宝单词乐园 v1.0.0                      │    │
│  │  面向 2-4 岁幼儿的单词学习应用             │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
└─────────────────────────────────────────────────┘
```

### 4.2 交互设计

| 功能 | 交互 |
|------|------|
| 夜间模式 | Toggle 开关，立即生效 |
| 音量调节 | 滑块 0-100%，实时调节 TTS 音量 |
| 进度重置 | 点击弹出确认对话框 |
| 返回 | 左箭头或 Esc 键 |

---

## 五、状态管理

### 5.1 类型定义

```typescript
// types/index.ts 新增
export type ThemeMode = 'light' | 'dark';

export interface Settings {
  mascot: MascotId;
  theme: ThemeMode;
  volume: number; // 0-100
}
```

### 5.2 localStorage 键值

```typescript
const STORAGE_KEYS = {
  mascot: 'mascot',        // 现有：吉祥物选择
  theme: 'theme',          // 新增：主题模式
  volume: 'volume',        // 新增：音量
};
```

### 5.3 useSettings Hook

```typescript
// hooks/useSettings.ts
export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => loadSettings());

  // 主题切换
  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateSetting('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // 音量调节
  const setVolume = (volume: number) => {
    updateSetting('volume', volume);
  };

  // 进度重置
  const resetProgress = () => {
    // 调用 store 的 resetProgress
  };

  return { settings, toggleTheme, setVolume, resetProgress };
}
```

---

## 六、TTS 音量支持

### 6.1 修改 tts.ts

```typescript
// utils/tts.ts
export function speak(text: string, lang: PlayLang, volume: number = 1) {
  return new Promise<void>((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-US' : 'zh-CN';
    utterance.rate = 0.8;
    utterance.volume = volume; // 0-1，从设置读取

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    speechSynthesis.speak(utterance);
  });
}
```

### 6.2 Store 修改

```typescript
// useGameStore.ts
interface GameState {
  // ... 现有状态
  volume: number; // 新增
  // ...
}

// playAudio 和 playAutoSequence 调用 speak 时传入 volume
```

---

## 七、背景装饰适配

夜间模式下背景装饰圆形颜色需调整，降低不透明度或使用更深的颜色：

```tsx
// HomePage.tsx / GamePage.tsx
// 日间模式
<div className="absolute top-0 left-[200px] w-[350px] h-[350px] bg-[#E0D4F7] rounded-full opacity-30" />

// 夜间模式（通过 CSS 变量或条件渲染）
<div className="absolute top-0 left-[200px] w-[350px] h-[350px] bg-mascot-300 rounded-full opacity-10 dark:opacity-5" />
```

---

## 八、文件结构

```
src/
  components/
    TopBar/
      TopBar.tsx           # 修改：添加设置图标
    SettingsPanel/         # 新增
      SettingsPanel.tsx    # 设置项容器
      SettingItem.tsx      # 单项设置组件
      Toggle.tsx           # 开关组件
      Slider.tsx           # 滑块组件
      ConfirmDialog.tsx    # 确认对话框
  pages/
    HomePage.tsx           # 修改：背景装饰适配
    GamePage.tsx           # 修改：背景装饰适配
    SettingsPage.tsx       # 新增：设置页面
  hooks/
    useMascotTheme.ts      # 保持不变
    useSettings.ts         # 新增：设置状态管理
  utils/
    tts.ts                 # 修改：支持音量参数
  types/
    index.ts               # 修改：添加 ThemeMode 类型
  index.css                # 修改：添加夜间配色变量
  App.tsx                  # 修改：添加路由
```

---

## 九、任务清单

### 阶段 1：基础设施
- [ ] 添加 ThemeMode 类型定义
- [ ] 创建 useSettings Hook
- [ ] 添加夜间配色 CSS 变量
- [ ] 修改 tts.ts 支持音量参数

### 阶段 2：设置页组件
- [ ] 创建 Toggle 组件
- [ ] 创建 Slider 组件
- [ ] 创建 ConfirmDialog 组件
- [ ] 创建 SettingItem 组件
- [ ] 创建 SettingsPanel 组件
- [ ] 创建 SettingsPage 页面
- [ ] 添加路由配置

### 阶段 3：集成与适配
- [ ] TopBar 添加设置图标
- [ ] Store 添加 volume 状态
- [ ] HomePage 背景装饰适配
- [ ] GamePage 背景装饰适配

### 阶段 4：验证与提交
- [ ] 构建验证
- [ ] 功能测试（主题切换、音量、重置）
- [ ] 提交变更

---

## 十、风险与备选方案

| 风险 | 备选方案 |
|------|----------|
| TTS 音量 API 兼容性 | 部分浏览器不支持，降级为静默 |
| 夜间配色视觉效果不佳 | 根据测试反馈微调色值 |
| 确认对话框样式不统一 | 使用 Framer Motion 动画 |
