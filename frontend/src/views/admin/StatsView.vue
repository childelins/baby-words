<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-theme-animal font-cute">
          数据统计
        </h1>
        <div class="flex items-center gap-4">
          <span class="text-gray-600">欢迎, {{ authStore.user?.username }}</span>
          <button
            @click="handleLogout"
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            退出
          </button>
        </div>
      </div>
    </header>

    <nav class="bg-white border-b">
      <div class="container mx-auto px-4">
        <div class="flex gap-6">
          <RouterLink
            to="/admin"
            class="py-4 px-2 border-b-2 border-transparent hover:border-gray-300 transition"
          >
            概览
          </RouterLink>
          <RouterLink
            to="/admin/categories"
            class="py-4 px-2 border-b-2 border-transparent hover:border-gray-300 transition"
          >
            分类
          </RouterLink>
          <RouterLink
            to="/admin/words"
            class="py-4 px-2 border-b-2 border-transparent hover:border-gray-300 transition"
          >
            单词
          </RouterLink>
          <RouterLink
            to="/admin/stats"
            class="py-4 px-2 border-b-2 border-theme-animal text-theme-animal font-medium"
          >
            统计
          </RouterLink>
        </div>
      </div>
    </nav>

    <main class="container mx-auto px-4 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-theme-animal"></div>
      </div>

      <div v-else-if="error" class="text-red-500 text-center py-12">
        {{ error }}
      </div>

      <div v-else-if="stats">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-2xl shadow-soft p-6">
            <div class="text-4xl font-bold text-theme-animal mb-2">
              {{ stats.totalCategories }}
            </div>
            <div class="text-gray-600">总分类数</div>
          </div>

          <div class="bg-white rounded-2xl shadow-soft p-6">
            <div class="text-4xl font-bold text-theme-fruit mb-2">
              {{ stats.totalWords }}
            </div>
            <div class="text-gray-600">总单词数</div>
          </div>

          <div class="bg-white rounded-2xl shadow-soft p-6">
            <div class="text-4xl font-bold text-theme-transport mb-2">
              {{ averageWordsPerCategory }}
            </div>
            <div class="text-gray-600">平均每分类单词数</div>
          </div>

          <div class="bg-white rounded-2xl shadow-soft p-6">
            <div class="text-4xl font-bold text-theme-color mb-2">
              {{ stats.wordsPerCategory.length }}
            </div>
            <div class="text-gray-600">活跃分类</div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-soft p-6">
          <h2 class="text-xl font-bold mb-6">每个分类的单词数量</h2>
          <div class="space-y-4">
            <div
              v-for="item in stats.wordsPerCategory"
              :key="item.category"
              class="flex items-center"
            >
              <div class="w-32 text-sm font-medium text-gray-700">
                {{ item.category }}
              </div>
              <div class="flex-1 mx-4">
                <div class="bg-gray-200 rounded-full h-4">
                  <div
                    class="bg-theme-animal h-4 rounded-full transition-all duration-500"
                    :style="{ width: `${(item.count / maxWords) * 100}%` }"
                  ></div>
                </div>
              </div>
              <div class="w-16 text-right text-sm font-bold text-gray-700">
                {{ item.count }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { statsApi } from '@/api/client'
import type { Stats } from '@/types'

const router = useRouter()
const authStore = useAuthStore()

const stats = ref<Stats | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const averageWordsPerCategory = computed(() => {
  if (!stats.value || stats.value.totalCategories === 0) return 0
  return Math.round(stats.value.totalWords / stats.value.totalCategories)
})

const maxWords = computed(() => {
  if (!stats.value || stats.value.wordsPerCategory.length === 0) return 1
  return Math.max(...stats.value.wordsPerCategory.map((item) => item.count))
})

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}

onMounted(async () => {
  loading.value = true
  error.value = null

  try {
    stats.value = await statsApi.get()
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to fetch stats'
  } finally {
    loading.value = false
  }
})
</script>
