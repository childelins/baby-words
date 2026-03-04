<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
    <div class="bg-white rounded-3xl shadow-card p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-theme-animal mb-2 font-cute">
          管理员登录
        </h1>
        <p class="text-gray-600">Baby Words Admin</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            管理员密码
          </label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none transition"
            placeholder="请输入管理员密码"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-theme-animal text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-button"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const handleLogin = async () => {
  loading.value = true
  error.value = null

  try {
    await authStore.login(password.value)
    router.push({ name: 'dashboard' })
  } catch (err: any) {
    error.value = err.response?.data?.error || '登录失败，请检查密码'
  } finally {
    loading.value = false
  }
}
</script>
