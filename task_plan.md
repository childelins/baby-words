# Task Plan: 宝宝学单词 - 全栈应用

## Goal
创建一个有趣好玩的单词学习应用，专为三岁宝宝设计，通过视觉、声音和互动激发学习兴趣。支持云端内容管理和学习数据统计。

## Current Phase
Phase 8 (complete) - 全栈升级完成

## Phases

### Phase 1: 需求分析与设计
- [x] 理解用户需求（三岁宝宝、有趣好玩）
- [x] 确定技术方案（网页应用）
- [x] 确定单词类别（9个分类：动物、水果、颜色、车辆、家庭、身体、日常、自然、数字）
- [x] 确定发音语言（中英双语）
- **Status:** complete

### Phase 2: 技术选型与架构
- [x] 选择纯HTML/CSS/JS单文件
- [x] 使用Web Speech API发音
- **Status:** complete

### Phase 3: 核心功能实现
- [x] 实现卡片展示组件
- [x] 添加中英双语发音
- [x] 实现翻卡/切换动画
- [x] 添加星星特效
- [x] 添加触摸滑动支持
- **Status:** complete

### Phase 4: 内容填充
- [x] 9个分类，共144个单词
- **Status:** complete

### Phase 5: 测试与优化
- [x] 修复播放延迟问题
- [x] 添加适合宝宝的音色选择
- **Status:** complete

### Phase 6: 架构升级 - React + Vite + TailwindCSS
- [x] 初始化 React + TypeScript 项目
- [x] 配置 TailwindCSS
- [x] 设计系统（色彩、圆角、阴影、动画）
- [x] 组件开发（CategoryCard, WordCard, Navigation, Settings）
- [x] 页面实现（HomePage, LearningPage）
- [x] 功能迁移（数据、语音、触摸、键盘）
- **Status:** complete

### Phase 7: 修复英文发音问题
- [x] 诊断英文发音缺失原因
- [x] 修复 getVoice 函数
- **Status:** complete

### Phase 8: 全栈升级 - Go 后端 + Vue 3 前端
- [x] **后端开发**
  - [x] Go + Gin + GORM + MySQL 技术栈
  - [x] 数据库设计（categories, words, learning_logs 表）
  - [x] REST API 实现
    - [x] 认证 API (JWT)
    - [x] 分类 CRUD API
    - [x] 单词 CRUD API
    - [x] 统计 API (dashboard, popular, recent)
    - [x] 学习记录 API (公开)
  - [x] 中间件 (CORS, JWT Auth)
- [x] **前端开发**
  - [x] Vue 3 + TypeScript + Vite
  - [x] Pinia 状态管理
  - [x] Vue Router 路由
  - [x] Axios API 客户端
  - [x] 学习端页面（HomeView, LearningView）
  - [x] 管理后台页面（Login, Dashboard, Categories, Words, Stats）
  - [x] 学习端组件（CategoryCard, WordCard, Navigation, Settings）
  - [x] 管理后台组件（CategoryForm, WordForm）
- [x] **数据库初始化**
  - [x] MySQL 初始化脚本
  - [x] 9个分类种子数据
  - [x] 144个单词种子数据
- [x] **项目清理**
  - [x] 移除旧的 React 项目文件
  - [x] 更新 .gitignore
  - [x] 更新 README.md
- **Status:** complete

## Key Questions
1. ~~使用什么技术？~~ → 后端 Go + Gin，前端 Vue 3 + TypeScript
2. ~~单词库内容？~~ → 144个单词，9个分类
3. ~~发音语言？~~ → 中英双语
4. ~~数据存储？~~ → MySQL 数据库

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Go + Gin + GORM | 高性能后端，简洁代码 |
| Vue 3 + TypeScript | 现代化前端，类型安全 |
| Pinia | Vue 3 官方状态管理 |
| MySQL 8.0 | 可靠的关系型数据库 |
| JWT 认证 | 简单安全的管理员认证 |
| API 分离 | 学习端公开 API，管理后台需认证 |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| - | - | - |

## Notes
- 学习端：无需登录，公开访问
- 管理后台：密码登录，JWT 认证
- 学习记录：自动记录浏览和发音行为
- 数据统计：热门单词、最近活动、今日学习数

## 技术架构
```
┌─────────────────────────────────────────────────────────────┐
│                        本地开发环境                          │
│                                                              │
│  ┌─────────────────┐         ┌─────────────────┐           │
│  │  Frontend       │         │   Backend       │           │
│  │  localhost:5173 │◄───────►│  :8080          │           │
│  │  Vue 3 + Vite   │  HTTP   │  Go + Gin       │           │
│  └─────────────────┘         └────────┬────────┘           │
│                                       │                     │
│                                  ┌────▼────────┐           │
│                                  │  MySQL      │           │
│                                  │  :3306      │           │
│                                  └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
```
