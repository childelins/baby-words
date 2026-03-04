# Findings & Decisions

## Requirements
- 目标用户：三岁宝宝
- 核心功能：卡片式单词学习
- 关键要求：有趣好玩
- 交互方式：简单、大按钮、触摸友好
- **新需求**：云端内容管理、学习数据统计

## Research Findings
- 三岁儿童认知特点：
  - 注意力约 5-10 分钟
  - 对鲜艳颜色敏感（红、黄、蓝、绿）
  - 喜欢动物、食物、交通工具等主题
  - 需要即时反馈和奖励

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| ~~纯HTML/CSS/JS单文件~~ | ~~无需服务器，双击即可打开~~ |
| ~~React + Vite~~ | ~~组件化开发~~ |
| **Go + Gin + GORM** | 高性能后端，简洁代码 |
| **Vue 3 + TypeScript** | 现代化前端，类型安全 |
| **MySQL 8.0** | 可靠的关系型数据库 |
| Web Speech API | 浏览器内置，无需音频文件 |
| 4种声音配置 | 可爱小姐姐、快乐小哥哥、萌萌宝宝音、亲切老师 |
| localStorage存储偏好 | 记住用户选择的声音 |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| 空格键播放延迟 | Web Speech API 需要等待 voices 加载完成；使用 voiceschanged 事件预热 |
| 首次播放延迟 | Chrome 已知问题，需要在页面加载时预先触发静音播放来预热引擎 |
| 英文发音缺失 | getVoice 函数 fallback 到 voices[0] 可能是中文声音；修复为返回 null 让浏览器使用 lang 属性选择默认声音 |

## Architecture Findings

### Backend (Go)
- Gin 框架简洁高效
- GORM 自动迁移方便开发
- JWT 中间件保护管理 API
- CORS 配置允许前端跨域访问

### Frontend (Vue 3)
- Composition API (`<script setup>`) 简洁易用
- Pinia stores 集中管理状态
- Vue Router 导航守卫保护管理页面
- Axios 拦截器自动添加 JWT token

### Database
- 3 张表：categories, words, learning_logs
- 外键级联删除
- 索引优化查询性能
- 时间戳自动更新

## API Endpoints
### 公开端点
- `POST /api/auth/login` - 管理员登录
- `GET /api/health` - 健康检查
- `POST /api/learning/log` - 记录学习活动

### 需认证端点
- `GET /api/categories` - 获取分类列表
- `POST /api/categories` - 创建分类
- `PUT /api/categories/:id` - 更新分类
- `DELETE /api/categories/:id` - 删除分类
- `GET /api/categories/:id/words` - 获取分类下的单词
- `GET /api/words` - 获取所有单词
- `POST /api/words` - 创建单词
- `PUT /api/words/:id` - 更新单词
- `DELETE /api/words/:id` - 删除单词
- `GET /api/stats/dashboard` - 仪表盘统计
- `GET /api/stats/popular` - 热门单词
- `GET /api/stats/recent` - 最近学习记录

## Resources
- Go 官方文档: https://go.dev/doc/
- Gin 框架: https://gin-gonic.com/
- GORM 文档: https://gorm.io/docs/
- Vue 3 文档: https://vuejs.org/
- Pinia 文档: https://pinia.vuejs.org/

## Visual/Browser Findings
- Tailwind CSS 快速开发样式
- 响应式设计适配移动端
- 动画增强用户体验

## Development Notes
- **服务启动**：不要通过 CLI 启动前后端服务，用户会自己启动

---
*Update this file after every 2 view/browser/search operations*
