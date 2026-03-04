# Baby Words Frontend

Vue 3 frontend for the Baby Words application.

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Vue Router** - Official router for Vue.js
- **Pinia** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
src/
├── api/
│   └── client.ts          # API client with axios
├── components/
│   ├── admin/
│   │   ├── CategoryForm.vue    # Category form modal
│   │   └── WordForm.vue        # Word form modal
│   └── learn/
│       ├── CategoryCard.vue    # Category card for home
│       ├── Navigation.vue      # Navigation bar
│       └── WordCard.vue        # Word card for learning
├── hooks/
│   └── useSpeech.ts      # Speech synthesis hook
├── router/
│   └── index.ts          # Vue Router configuration
├── stores/
│   ├── auth.ts           # Authentication store
│   ├── category.ts       # Category store
│   └── word.ts           # Word store
├── types/
│   └── index.ts          # TypeScript types
├── views/
│   ├── admin/
│   │   ├── LoginView.vue        # Admin login page
│   │   ├── DashboardView.vue    # Admin dashboard
│   │   ├── CategoriesView.vue   # Category management
│   │   ├── WordsView.vue        # Word management
│   │   └── StatsView.vue        # Statistics page
│   └── learn/
│       ├── HomeView.vue         # Learning home (category selection)
│       └── LearningView.vue     # Learning page (word cards)
├── App.vue
├── main.ts
└── style.css
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Features

- **Public Learning Interface**
  - Browse categories
  - View words with translations
  - Text-to-speech for English pronunciation

- **Admin Panel**
  - Authentication
  - Category management (CRUD)
  - Word management (CRUD)
  - Statistics dashboard

## API Configuration

The API base URL is configured via environment variable:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

Copy `.env.example` to `.env.development` to configure your local environment.

## Tailwind CSS Theme Colors

The app uses custom theme colors for different categories:

- `theme-animal` - Animals (warm brown)
- `theme-fruit` - Fruits (fresh green)
- `theme-color` - Colors & Shapes (rainbow colors)
- `theme-transport` - Transportation (sky blue)
- `theme-family` - Family (warm pink)
- `theme-body` - Body (healthy pink)
- `theme-daily` - Daily Life (warm orange)
- `theme-nature` - Nature (forest green)
- `theme-number` - Numbers (blue-purple)
