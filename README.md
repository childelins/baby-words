# 宝宝学单词

一个专为幼儿设计的中英文单词学习应用，通过有趣的互动方式帮助宝宝学习基础词汇。

## 功能特性

- **多分类学习**: 包含 9 个主题分类，共 140+ 个常用单词
  - 动物世界
  - 美味水果
  - 颜色形状
  - 交通工具
  - 家庭成员
  - 身体部位
  - 日常用品
  - 天气自然
  - 数字乐园

- **语音朗读**: 支持 Web Speech API 进行中英文发音
- **手势操作**: 支持左右滑动切换单词卡片
- **键盘支持**: 方向键切换、空格播放发音、ESC 返回首页
- **响应式设计**: 适配手机、平板和桌面设备

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
src/
├── components/     # 可复用组件
│   ├── CategoryCard.tsx
│   ├── Navigation.tsx
│   ├── Settings.tsx
│   └── WordCard.tsx
├── data/          # 数据文件
│   ├── voices.ts
│   └── words.ts
├── hooks/         # 自定义 Hooks
│   ├── useSpeech.ts
│   └── useSwipe.ts
├── pages/         # 页面组件
│   ├── HomePage.tsx
│   └── LearningPage.tsx
├── styles/        # 样式文件
├── types/         # TypeScript 类型定义
├── App.tsx
└── main.tsx
```

## 操作说明

| 操作 | 触摸 | 键盘 |
|------|------|------|
| 上一张 | 向右滑动 | 左方向键 |
| 下一张 | 向左滑动 | 右方向键 |
| 播放发音 | 点击卡片 | 空格键 |
| 返回首页 | 点击首页按钮 | ESC |

## License

MIT
