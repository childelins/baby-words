# Progress Log

## Session: 2026-03-04

### Phase 8: 全栈升级完成 ✅
- **Status:** complete
- **Started:** 2026-03-04
- **Completed:** 2026-03-04
- Actions taken:
  - 创建 Go 后端项目结构
  - 实现 GORM 数据模型 (Category, Word, LearningLog)
  - 实现 REST API handlers (Auth, Category, Word, Stats, Learning)
  - 实现 JWT 认证中间件
  - 创建 MySQL 数据库初始化脚本（9个分类，144个单词）
  - 创建 Vue 3 + TypeScript 前端项目
  - 实现 Pinia stores (auth, category, word)
  - 实现 API client with axios
  - 实现学习端组件 (HomeView, LearningView, CategoryCard, WordCard, Navigation)
  - 实现管理后台组件 (LoginView, DashboardView, CategoriesView, WordsView, StatsView)
  - 迁移 useSpeech hook 到 Vue 3
  - 配置 Vue Router with 认证守卫
  - 清理旧的 React 项目文件
- Files created:
  - **Backend:**
    - backend/main.go
    - backend/go.mod
    - backend/config/config.go
    - backend/database/db.go
    - backend/models/{category,word,learning_log}.go
    - backend/handlers/{auth,category,word,stats,learning}.go
    - backend/middleware/{cors,auth}.go
  - **Frontend:**
    - frontend/package.json
    - frontend/vite.config.ts
    - frontend/tailwind.config.js
    - frontend/src/main.ts
    - frontend/src/App.vue
    - frontend/src/router/index.ts
    - frontend/src/api/client.ts
    - frontend/src/api/types.ts
    - frontend/src/stores/{auth,category,word}.ts
    - frontend/src/types/index.ts
    - frontend/src/hooks/useSpeech.ts
    - frontend/src/views/learn/{HomeView,LearningView}.vue
    - frontend/src/views/admin/{LoginView,DashboardView,CategoriesView,WordsView,StatsView}.vue
    - frontend/src/components/learn/{CategoryCard,WordCard,Navigation,Settings}.vue
    - frontend/src/components/admin/{CategoryForm,WordForm}.vue
  - **Database:**
    - mysql/init.sql

- Tech Stack:
  - **Backend:** Go 1.21, Gin, GORM, MySQL 8.0, JWT
  - **Frontend:** Vue 3, TypeScript, Vite, Pinia, Vue Router, Tailwind CSS, Axios

---

## Session: 2026-02-21

### Phase 7: 修复英文发音问题
- **Status:** complete
- **Started:** 2026-02-21
- Actions taken:
  - 诊断问题：getVoice 函数在找不到英文声音时 fallback 到 voices[0]，可能是中文声音
  - 修复 getVoice：英文找不到时返回 null 而非中文声音
  - 修复 speak：先设置 utterance.lang 再设置 voice，确保语言正确
  - 启动开发服务器测试
- Files modified:
  - src/hooks/useSpeech.ts (modified)

---

## Session: 2026-02-15

### Phase 1: 需求分析与设计
- **Status:** complete
- **Started:** 2026-02-15
- Actions taken:
  - 创建项目规划文件
  - 确认用户需求：网页应用、四类单词、中英双语
- Files created/modified:
  - task_plan.md (created)
  - findings.md (created)
  - progress.md (created)

### Phase 2-3: 技术实现
- **Status:** complete
- Actions taken:
  - 选择纯HTML/CSS/JS单文件方案
  - 实现分类选择页面
  - 实现卡片展示组件
  - 添加Web Speech API中英双语发音
  - 添加星星动画特效
  - 添加触摸滑动和键盘支持
- Files created/modified:
  - baby-words/index.html (created)

## Test Results
| Test | Input | Expected | Actual | Status |
|------|-------|----------|--------|--------|
| - | - | - | - | - |

## Error Log
| Timestamp | Error | Attempt | Resolution |
|-----------|-------|---------|------------|
| 2026-02-15 | 空格键播放延迟 | 1 | 重写语音预热逻辑，等待voices加载+静音预热 |

## 5-Question Reboot Check
| Question | Answer |
|----------|--------|
| Where am I? | Phase 8 - 全栈升级完成 |
| Where am I going? | 项目已完成，可开始测试和部署 |
| What's the goal? | 创建有趣好玩的宝宝单词学习应用，支持后端管理 |
| What have I learned? | Go + Gin + GORM 后端开发，Vue 3 + Pinia 前端开发 |
| What have I done? | 完成从 React 单页应用到全栈应用的完整升级 |

---
*Update after completing each phase or encountering errors*
