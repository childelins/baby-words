import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginResponse } from '@/api/types'
import { authApi } from '@/api/client'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const login = async (password: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await authApi.login(password)
      token.value = response.token
      localStorage.setItem('auth_token', response.token)
      return response
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    localStorage.removeItem('auth_token')
  }

  const isAuthenticated = () => {
    return !!token.value
  }

  return {
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
  }
})
