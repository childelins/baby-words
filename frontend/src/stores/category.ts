import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Category } from '@/types'
import { categoryApi, learningApi, type CreateCategoryRequest, type UpdateCategoryRequest } from '@/api/client'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const currentCategory = ref<Category | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      // Use public API for learning (no auth required)
      categories.value = await learningApi.getCategories()
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch categories'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchCategory = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const category = categories.value.find(c => c.id === id)
      if (category) {
        currentCategory.value = category
      }
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch category'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (data: CreateCategoryRequest) => {
    loading.value = true
    error.value = null
    try {
      const newCategory = await categoryApi.create(data)
      categories.value.push(newCategory)
      return newCategory
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to create category'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCategory = async (id: string, data: UpdateCategoryRequest) => {
    loading.value = true
    error.value = null
    try {
      const updatedCategory = await categoryApi.update(id, data)
      const index = categories.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        categories.value[index] = updatedCategory
      }
      if (currentCategory.value?.id === id) {
        currentCategory.value = updatedCategory
      }
      return updatedCategory
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to update category'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCategory = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await categoryApi.delete(id)
      categories.value = categories.value.filter((c) => c.id !== id)
      if (currentCategory.value?.id === id) {
        currentCategory.value = null
      }
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to delete category'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    currentCategory,
    loading,
    error,
    fetchCategories,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  }
})
