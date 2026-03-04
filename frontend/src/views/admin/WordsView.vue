<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-theme-animal font-cute">
          单词管理
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
            class="py-4 px-2 border-b-2 border-theme-animal text-theme-animal font-medium"
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
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-4">
          <h2 class="text-xl font-bold">所有单词</h2>
          <select
            v-model="selectedCategoryId"
            class="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
          >
            <option :value="null">所有分类</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.nameZh }}
            </option>
          </select>
        </div>
        <button
          @click="showCreateForm = true"
          class="px-6 py-3 bg-theme-animal text-white rounded-xl hover:bg-opacity-90 transition shadow-button"
        >
          添加单词
        </button>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-theme-animal"></div>
      </div>

      <div v-else-if="error" class="text-red-500 text-center py-12">
        {{ error }}
      </div>

      <div v-else class="bg-white rounded-2xl shadow-soft overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                单词
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                翻译
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                分类
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                难度
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="word in filteredWords" :key="word.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ word.word }}</div>
                <div class="text-sm text-gray-500">{{ word.phonetic }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ word.translation }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ getCategoryName(word.categoryId) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span
                    v-for="i in word.difficulty"
                    :key="i"
                    class="text-yellow-400"
                  >★</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="editWord(word)"
                  class="text-theme-animal hover:text-theme-animal-light mr-4"
                >
                  编辑
                </button>
                <button
                  @click="deleteWord(word.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <WordForm
        v-if="showCreateForm"
        :categories="categories"
        @close="showCreateForm = false"
        @save="handleCreateWord"
      />

      <WordForm
        v-if="editingWord"
        :word="editingWord"
        :categories="categories"
        @close="editingWord = null"
        @save="handleUpdateWord"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCategoryStore } from '@/stores/category'
import { useWordStore } from '@/stores/word'
import WordForm from '@/components/admin/WordForm.vue'
import type { Word, Category } from '@/types'

const router = useRouter()
const authStore = useAuthStore()
const categoryStore = useCategoryStore()
const wordStore = useWordStore()

const { categories } = categoryStore
const { words, loading, error } = wordStore

const selectedCategoryId = ref<number | null>(null)
const showCreateForm = ref(false)
const editingWord = ref<Word | null>(null)

const filteredWords = computed(() => {
  if (selectedCategoryId.value === null) {
    return words
  }
  return words.filter((w) => w.categoryId === selectedCategoryId.value)
})

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}

const getCategoryName = (categoryId: number) => {
  const category = categories.find((c) => c.id === categoryId)
  return category?.nameZh || '未知'
}

const editWord = (word: Word) => {
  editingWord.value = word
}

const deleteWord = async (id: number) => {
  if (confirm('确定要删除这个单词吗？')) {
    try {
      await wordStore.deleteWord(id)
    } catch (err) {
      console.error('Failed to delete word:', err)
    }
  }
}

const handleCreateWord = async (data: Partial<Word>) => {
  try {
    await wordStore.createWord(data)
    showCreateForm.value = false
  } catch (err) {
    console.error('Failed to create word:', err)
  }
}

const handleUpdateWord = async (data: Partial<Word>) => {
  if (!editingWord.value) return

  try {
    await wordStore.updateWord(editingWord.value.id, data)
    editingWord.value = null
  } catch (err) {
    console.error('Failed to update word:', err)
  }
}

onMounted(async () => {
  await categoryStore.fetchCategories()
  if (categories.length > 0) {
    await wordStore.fetchWordsByCategory(categories[0].id)
  }
})
</script>
