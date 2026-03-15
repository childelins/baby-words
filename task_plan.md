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

## 阶段七：待优化项

- [ ] 响应式适配（平板/手机端）
- [ ] 动画效果优化
- [ ] PWA 图标资源
- [ ] 离线支持测试

---

## 关键决策记录

| 日期 | 决策 | 原因 |
|------|------|------|
| 2026-03-15 | 使用 Web Speech API | 无需后端，纯前端 TTS |
| 2026-03-15 | Zustand 替代 Redux | 轻量级，适合小型应用 |
| 2026-03-15 | 5×2 网格分类布局 | 匹配 main.pen 设计稿 |
