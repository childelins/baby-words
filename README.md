# 宝宝学单词 - 全栈应用

一个为儿童设计的双语单词学习应用，支持中文和英文发音。

## 技术栈

### 前端
- Vue 3 + TypeScript
- Vite
- Pinia (状态管理)
- Vue Router
- Tailwind CSS
- Axios

### 后端
- Go 1.21
- Gin (Web 框架)
- GORM (ORM)
- MySQL 8.0
- JWT (认证)

## 项目结构

```
baby-words/
├── frontend/                    # Vue 3 前端
│   ├── src/
│   │   ├── views/              # 页面组件
│   │   │   ├── learn/          # 学习端
│   │   │   │   ├── HomeView.vue
│   │   │   │   └── LearningView.vue
│   │   │   └── admin/          # 管理后台
│   │   │       ├── LoginView.vue
│   │   │       ├── DashboardView.vue
│   │   │       ├── CategoriesView.vue
│   │   │       ├── WordsView.vue
│   │   │       └── StatsView.vue
│   │   ├── components/         # 组件
│   │   ├── stores/             # Pinia stores
│   │   ├── api/                # API 客户端
│   │   ├── router/             # 路由
│   │   ├── types/              # 类型定义
│   │   └── hooks/              # 组合式函数
│   └── package.json
│
├── backend/                     # Go 后端
│   ├── main.go
│   ├── config/                 # 配置
│   ├── models/                 # 数据模型
│   ├── handlers/               # API 处理器
│   ├── middleware/             # 中间件
│   ├── database/               # 数据库
│   └── go.mod
│
└── mysql/                       # 数据库脚本
    └── init.sql
```

## 快速开始

### 1. 数据库设置

使用 Docker 运行 MySQL：

```bash
docker run --name baby-words-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=baby_words \
  -p 3306:3306 \
  -d mysql:8.0
```

初始化数据库：

```bash
mysql -h localhost -u root -ppassword < mysql/init.sql
```

### 2. 后端设置

```bash
cd backend

# 复制环境变量文件
cp .env.example .env

# 安装依赖
go mod download

# 运行后端
go run main.go
```

后端将在 http://localhost:8080 启动

### 3. 前端设置

```bash
cd frontend

# 安装依赖
npm install

# 运行开发服务器
npm run dev
```

前端将在 http://localhost:5173 启动

## API 端点

### 公开端点
- `GET /api/health` - 健康检查
- `POST /api/auth/login` - 管理员登录
- `POST /api/learning/log` - 记录学习活动

### 需要认证的端点
- `GET /api/categories` - 获取所有分类
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

## 默认管理员密码

在 `.env` 文件中配置，默认为 `admin123`

## 页面路由

### 学习端（公开）
- `/` - 首页 - 分类选择
- `/learn/:categoryId` - 学习页 - 单词卡片

### 管理后台（需要登录）
- `/admin/login` - 登录页
- `/admin` - 仪表盘
- `/admin/categories` - 分类管理
- `/admin/words` - 单词管理
- `/admin/stats` - 统计分析

## 数据库设计

### categories 表
- `id` (VARCHAR) - 主键
- `title` - 标题
- `emoji` - 表情符号
- `gradient` - 渐变色类
- `sort_order` - 排序

### words 表
- `id` (BIGINT) - 自增主键
- `category_id` - 分类外键
- `emoji` - 表情符号
- `cn` - 中文
- `en` - 英文
- `sort_order` - 排序

### learning_logs 表
- `id` (BIGINT) - 自增主键
- `word_id` - 单词外键
- `action` - 动作类型 (view/speak)
- `ip_address` - IP地址
- `user_agent` - 用户代理
- `created_at` - 创建时间

## 开发

### 后端开发
```bash
cd backend
go run main.go
```

### 前端开发
```bash
cd frontend
npm run dev
```

## 生产构建

### 前端
```bash
cd frontend
npm run build
```

### 后端
```bash
cd backend
go build -o baby-words-api main.go
```
