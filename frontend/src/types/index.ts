// Category types (matching backend)
export interface Category {
  id: string
  title: string
  emoji: string
  gradient: string
  sort_order: number
  created_at: string
  updated_at: string
  words?: Word[]
}

// Word types (matching backend)
export interface Word {
  id: number
  category_id: string
  emoji: string
  cn: string
  en: string
  sort_order: number
  created_at: string
  updated_at: string
  category?: Category
}

// Learning log types
export interface LearningLog {
  id: number
  word_id: number
  action: 'view' | 'speak'
  ip_address?: string
  user_agent?: string
  created_at: string
  word?: Word
}

// Auth types
export interface LoginRequest {
  password: string
}

export interface LoginResponse {
  token: string
}

// Stats types
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

// UI helper types
export interface VoiceProfile {
  id: string
  name: string
  desc: string
  emoji: string
  pitch: number
  rate: number
  lang: string
}

// API Error types
export interface ApiError {
  error: string
  message?: string
}
