// API request/response types matching backend

export interface CreateCategoryRequest {
  id: string
  title: string
  emoji: string
  gradient: string
  sort_order?: number
}

export interface UpdateCategoryRequest {
  title?: string
  emoji?: string
  gradient?: string
  sort_order?: number
}

export interface CreateWordRequest {
  category_id: string
  emoji: string
  cn: string
  en: string
  sort_order?: number
}

export interface UpdateWordRequest {
  category_id?: string
  emoji?: string
  cn?: string
  en?: string
  sort_order?: number
}

export interface LoginRequest {
  password: string
}

export interface LoginResponse {
  token: string
}

export interface DashboardStats {
  total_categories: number
  total_words: number
  today_learning: number
}

export interface PopularWord {
  word_id: number
  word: string
  emoji: string
  cn: string
  en: string
  view_count: number
  speak_count: number
  total_count: number
}

export interface RecentLog {
  id: number
  word_id: number
  action: string
  emoji: string
  cn: string
  en: string
  created_at: string
}
