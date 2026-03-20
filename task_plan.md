# 宝宝单词乐园 PWA - 任务计划

## 项目概述

面向 2-4 岁幼儿的单词学习 Web 应用，采用 PWA 技术实现可安装、离线可用的体验。

**技术栈**: React 18 + TypeScript + Vite + Tailwind CSS + Zustand + Framer Motion

---

## 阶段一：基础搭建 ✅ 已完成

- [x] 初始化 Vite + React + TypeScript 项目
- [x] 配置 Tailwind CSS
- [x] 配置 PWA (vite-plugin-pwa)
- [x] 搭建项目结构
- [x] 编写单词数据 JSON (10 个分类)

---

## 阶段二：核心组件 ✅ 已完成

- [x] TopBar - 顶部栏（星星、标题、连续天数）
- [x] Mascot - 吉祥物（紫猫 + 对话气泡）
- [x] WordCard - 单词卡片（emoji、英文、中文、音标）
- [x] CategoryList - 分类列表（5×2 网格布局）
- [x] ProgressBar - 底部进度条
- [x] NavButtons - 导航按钮（含键盘提示）
- [x] CompleteModal - 完成弹窗

---

## 阶段三：核心功能 ✅ 已完成

- [x] Zustand 状态管理 (useGameStore)
- [x] TTS 音频播放 (Web Speech API)
- [x] 自动播放流程（英文 → 中文）
- [x] 分类切换逻辑
- [x] 键盘快捷键支持（Space/←/→/Home）

---

## 阶段四：进度系统 ✅ 已完成

- [x] localStorage 存储
- [x] 进度条显示
- [x] 连续学习天数计算
- [x] 星星积分系统

---

## 阶段五：UI 调整 ✅ 已完成

- [x] 对照 main.pen 设计稿调整布局
- [x] 分类列表改为网格布局
- [x] 添加键盘提示到导航按钮
- [x] 添加 Space 键提示到播放指示器
- [x] 调整背景装饰位置

---

## 阶段六：当前任务 - 进度条与键盘优化 ✅ 已完成

### 任务描述
1. **主题卡片进度条**: 在每个分类卡片上显示该分类的学习进度
2. **Esc 键支持**: 完成弹窗和主页支持 Esc 键返回

### 已实现
- [x] CategoryList 组件：每个分类卡片底部显示进度条
- [x] CompleteModal 组件：支持 Esc 键关闭并返回主页
- [x] HomePage/GamePage：支持 Esc 键返回主页
- [x] NavButtons：主页按钮快捷键提示改为 Esc

---

## 阶段七：动画效果增强 ✅ 已完成

### 任务描述
为宝宝单词乐园添加系统性动画效果，提升交互体验和趣味性。

### 已实现
- [x] **反馈动画**
  - TopBar 星星数字变化弹入动画
  - 播放指示器脉冲和声波动画
  - 分类卡片点击涟漪效果
  - CompleteModal 弹窗依次出现动画
- [x] **卡片动画**
  - WordCard 方向感知切换动画（上一个/下一个）
  - WordCard 内容依次出现动画（stagger）
- [x] **吉祥物动画**
  - Mascot 待机呼吸效果
  - Mascot 播放时点头/摇头

### 提交记录
- `0fe7ec6` feat(animation): TopBar 星星数字变化动画
- `a7943aa` feat(animation): 播放指示器脉冲和声波动画
- `6711fc8` feat(animation): 分类卡片点击涟漪效果
- `2a1adc5` feat(ui): 增强 CompleteModal 弹窗动画效果
- `3da8b04` feat(animation): WordCard 方向感知切换动画
- `bda9615` feat(animation): WordCard 内容依次出现动画
- `4c50fa3` feat(ui): 添加 Mascot 待机呼吸动画

---

## 阶段八：单词扩展与布局优化 ✅ 已完成

### 任务描述
扩展单词数量并优化分类布局，新增美味水果分类，修改网格布局从 5×2 到 4×3。

### 变更文件
| 文件 | 操作 | 说明 |
|------|------|------|
| `src/data/words.json` | 修改 | 更新所有分类单词数据 |
| `src/components/CategoryList/CategoryList.tsx` | 修改 | 网格布局 5×2 → 4×3 |

### 任务清单
- [x] Task 1: 更新单词数据 (words.json)
  - [x] 1.1 修改动物世界分类（16个单词）
  - [x] 1.2 修改缤纷色彩分类（新增 white/grey/brown）
  - [x] 1.3 修改数字王国分类（新增 zero）
  - [x] 1.4 修改我的家分类（修改 table emoji，新增单词）
  - [x] 1.5 修改交通工具分类（新增 4 个单词）
  - [x] 1.6 修改身体部位分类（新增 5 个单词）
  - [x] 1.7 修改服装配饰分类（修改 shirt emoji，新增单词）
  - [x] 1.8 修改自然植物分类（新增 6 个单词）
  - [x] 1.9 新增美味水果分类（12 个单词）
  - [x] 1.10 修改美味食物分类（移除水果，保留食物）
- [x] Task 2: 修改分类网格布局
  - [x] 2.1 更新网格布局从 5×2 到 4×3
  - [x] 2.2 验证构建
- [x] Task 3: 验证与提交
  - [x] 3.1 构建验证
  - [x] 3.2 功能验证
  - [x] 3.3 提交变更 (6372f07)

### 变更汇总
| 指标 | 变更前 | 变更后 |
|------|--------|--------|
| 分类数 | 10 | 11 |
| 单词总数 | ~84 | ~131 |
| 新增单词 | - | 47 |
| 网格布局 | 5×2 | 4×3 |

---

## 阶段九：吉祥物与主题系统 ✅ 已完成

### 任务描述
扩展吉祥物表情系统，实现 4 个可切换角色及配套主题配色。

### 技术方案
- CSS 变量实现运行时主题切换
- Fluent UI Emoji SVG 作为表情资源
- Zustand 管理吉祥物状态
- localStorage 持久化用户选择

### 文件变更概览
| 文件 | 操作 | 说明 |
|------|------|------|
| `src/types/index.ts` | 修改 | 添加 Mascot 类型定义 |
| `src/components/Mascot/mascotConfig.ts` | 新建 | 吉祥物配置文件 |
| `src/hooks/useMascotTheme.ts` | 新建 | 主题切换 Hook |
| `src/hooks/index.ts` | 修改 | 导出新 Hook |
| `src/index.css` | 修改 | 添加 CSS 变量主题 |
| `tailwind.config.js` | 修改 | 添加 mascot 色 |
| `src/store/useGameStore.ts` | 修改 | 添加吉祥物状态 |
| `src/components/Mascot/Mascot.tsx` | 重构 | 状态表情 + 主题联动 |
| `src/components/Mascot/MascotSelector.tsx` | 新建 | 选择器组件 |
| `src/components/Mascot/index.ts` | 修改 | 更新导出 |
| `src/pages/HomePage.tsx` | 修改 | 添加 MascotSelector |
| `src/pages/GamePage.tsx` | 修改 | primary → mascot |

### 任务清单
- [x] Task 1: 类型定义与配置
  - [x] 1.1 添加 Mascot 类型定义
  - [x] 1.2 创建 mascotConfig.ts
- [x] Task 2: CSS 变量主题系统
  - [x] 2.1 修改 index.css
  - [x] 2.2 修改 tailwind.config.js
- [x] Task 3: 主题切换 Hook
  - [x] 3.1 创建 useMascotTheme.ts
  - [x] 3.2 更新 hooks 导出
- [x] Task 4: Store 状态扩展
  - [x] 4.1 添加吉祥物状态到 useGameStore.ts
- [x] Task 5: 重构 Mascot 组件
  - [x] 5.1 重写 Mascot.tsx
- [x] Task 6: 创建 MascotSelector 组件
  - [x] 6.1 创建 MascotSelector.tsx
- [x] Task 7: 更新导出和集成
  - [x] 7.1 修改 Mascot/index.ts
  - [x] 7.2 修改 HomePage.tsx
- [x] Task 8: 组件主题迁移
  - [x] 8.1 修改 GamePage.tsx
- [x] Task 9: 验证与提交
  - [x] 9.1 构建验证成功 (361.27 KiB)
  - [x] 9.2 功能验证
  - [x] 9.3 提交变更 (71e94d8)

### 成果
| 指标 | 变更前 | 变更后 |
|------|--------|--------|
| 吉祥物数量 | 1 | 4 |
| 表情状态 | 0 | 4 |
| 主题色 | 固定紫色 | 4 种可选 |

---

## 阶段十：待优化项（暂缓）

> 暂不开发，后续根据需求再启动

- [ ] 响应式适配（平板/手机端）
- [ ] PWA 图标资源
- [ ] 离线支持测试

---

## 关键决策记录

| 日期 | 决策 | 原因 |
|------|------|------|
| 2026-03-15 | 使用 Web Speech API | 无需后端，纯前端 TTS |
| 2026-03-15 | Zustand 替代 Redux | 轻量级，适合小型应用 |
| 2026-03-15 | 5×2 网格分类布局 | 匹配 main.pen 设计稿 |
