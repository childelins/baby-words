import axios from 'axios'
import type { Category, Word } from '@/types'
import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CreateWordRequest,
  UpdateWordRequest,
  LoginRequest,
  LoginResponse,
  DashboardStats,
  PopularWord,
  RecentLog
} from './types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authApi = {
  login: async (password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', { password })
    return response.data
  },
}

// Category API
export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories')
    return response.data
  },

  create: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await api.post<Category>('/categories', data)
    return response.data
  },

  update: async (id: string, data: UpdateCategoryRequest): Promise<Category> => {
    const response = await api.put<Category>(`/categories/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`)
  },
}

// Word API
export const wordApi = {
  getByCategory: async (categoryId: string): Promise<Word[]> => {
    const response = await api.get<Word[]>(`/categories/${categoryId}/words`)
    return response.data
  },

  getAll: async (categoryId?: string): Promise<Word[]> => {
    const params = categoryId ? { category_id: categoryId } : {}
    const response = await api.get<Word[]>('/words', { params })
    return response.data
  },

  create: async (data: CreateWordRequest): Promise<Word> => {
    const response = await api.post<Word>('/words', data)
    return response.data
  },

  update: async (id: number, data: UpdateWordRequest): Promise<Word> => {
    const response = await api.put<Word>(`/words/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/words/${id}`)
  },
}

// Stats API
export const statsApi = {
  getDashboard: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>('/stats/dashboard')
    return response.data
  },

  getPopular: async (limit = 10): Promise<PopularWord[]> => {
    const response = await api.get<PopularWord[]>('/stats/popular', { params: { limit } })
    return response.data
  },

  getRecent: async (limit = 20): Promise<RecentLog[]> => {
    const response = await api.get<RecentLog[]>('/stats/recent', { params: { limit } })
    return response.data
  },
}

// Learning API (public, no auth)
export const learningApi = {
  log: async (wordId: number, action: 'view' | 'speak'): Promise<void> => {
    await api.post('/learning/log', { word_id: wordId, action })
  },

  // Public endpoints for learning (no auth required)
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/public/categories')
    return response.data
  },

  getWordsByCategory: async (categoryId: string): Promise<Word[]> => {
    const response = await api.get<Word[]>(`/public/categories/${categoryId}/words`)
    return response.data
  },
}

export default api
