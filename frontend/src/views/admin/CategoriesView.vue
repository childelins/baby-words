<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-theme-animal font-cute">
          分类管理
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
            class="py-4 px-2 border-b-2 border-theme-animal text-theme-animal font-medium"
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
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">所有分类</h2>
        <button
          @click="showCreateForm = true"
          class="px-6 py-3 bg-theme-animal text-white rounded-xl hover:bg-opacity-90 transition shadow-button"
        >
          添加分类
        </button>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-theme-animal"></div>
      </div>

      <div v-else-if="error" class="text-red-500 text-center py-12">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="category in categories"
          :key="category.id"
          class="bg-white rounded-2xl shadow-soft p-6"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="text-4xl">{{ category.icon }}</div>
            <div class="flex gap-2">
              <button
                @click="editCategory(category)"
                class="p-2 text-gray-500 hover:text-theme-animal transition"
              >
                编辑
              </button>
              <button
                @click="deleteCategory(category.id)"
                class="p-2 text-gray-500 hover:text-red-500 transition"
              >
                删除
              </button>
            </div>
          </div>
          <h3 class="text-lg font-bold mb-2">{{ category.nameZh }}</h3>
          <p class="text-sm text-gray-600 mb-2">{{ category.nameEn }}</p>
          <div class="flex items-center gap-2">
            <div
              class="w-6 h-6 rounded-full"
              :style="{ backgroundColor: category.color }"
            ></div>
            <span class="text-sm text-gray-500">{{ category.color }}</span>
          </div>
        </div>
      </div>

      <CategoryForm
        v-if="showCreateForm"
        @close="showCreateForm = false"
        @save="handleCreateCategory"
      />

      <CategoryForm
        v-if="editingCategory"
        :category="editingCategory"
        @close="editingCategory = null"
        @save="handleUpdateCategory"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCategoryStore } from '@/stores/category'
import CategoryForm from '@/components/admin/CategoryForm.vue'
import type { Category } from '@/types'

const router = useRouter()
const authStore = useAuthStore()
const categoryStore = useCategoryStore()

const { categories, loading, error } = categoryStore

const showCreateForm = ref(false)
const editingCategory = ref<Category | null>(null)

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}

const editCategory = (category: Category) => {
  editingCategory.value = category
}

const deleteCategory = async (id: number) => {
  if (confirm('确定要删除这个分类吗？')) {
    try {
      await categoryStore.deleteCategory(id)
    } catch (err) {
      console.error('Failed to delete category:', err)
    }
  }
}

const handleCreateCategory = async (data: Partial<Category>) => {
  try {
    await categoryStore.createCategory(data)
    showCreateForm.value = false
  } catch (err) {
    console.error('Failed to create category:', err)
  }
}

const handleUpdateCategory = async (data: Partial<Category>) => {
  if (!editingCategory.value) return

  try {
    await categoryStore.updateCategory(editingCategory.value.id, data)
    editingCategory.value = null
  } catch (err) {
    console.error('Failed to update category:', err)
  }
}

onMounted(() => {
  categoryStore.fetchCategories()
})
</script>
