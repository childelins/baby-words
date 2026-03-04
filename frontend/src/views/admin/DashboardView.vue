<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-theme-animal font-cute">
          管理面板
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
            class="py-4 px-2 border-b-2 border-theme-animal text-theme-animal font-medium"
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
            class="py-4 px-2 border-b-2 border-transparent hover:border-gray-300 transition"
          >
            统计
          </RouterLink>
        </div>
      </div>
    </nav>

    <main class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-2xl shadow-soft p-6">
          <div class="text-3xl font-bold text-theme-animal mb-2">
            {{ stats?.totalCategories || 0 }}
          </div>
          <div class="text-gray-600">总分类数</div>
        </div>

        <div class="bg-white rounded-2xl shadow-soft p-6">
          <div class="text-3xl font-bold text-theme-fruit mb-2">
            {{ stats?.totalWords || 0 }}
          </div>
          <div class="text-gray-600">总单词数</div>
        </div>

        <div class="bg-white rounded-2xl shadow-soft p-6">
          <div class="text-3xl font-bold text-theme-transport mb-2">
            {{ stats?.wordsPerCategory.length || 0 }}
          </div>
          <div class="text-gray-600">活跃分类</div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-soft p-6">
        <h2 class="text-xl font-bold mb-4">每个分类的单词数量</h2>
        <div v-if="stats?.wordsPerCategory" class="space-y-3">
          <div
            v-for="item in stats.wordsPerCategory"
            :key="item.category"
            class="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
          >
            <span class="font-medium">{{ item.category }}</span>
            <span class="bg-theme-animal text-white px-3 py-1 rounded-full text-sm">
              {{ item.count }}
            </span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { statsApi } from '@/api/client'
import type { Stats } from '@/types'

const router = useRouter()
const authStore = useAuthStore()

const stats = ref<Stats | null>(null)

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}

onMounted(async () => {
  try {
    stats.value = await statsApi.get()
  } catch (err) {
    console.error('Failed to fetch stats:', err)
  }
})
</script>
