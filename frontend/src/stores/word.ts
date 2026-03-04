import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Word } from '@/types'
import { wordApi, learningApi, type CreateWordRequest, type UpdateWordRequest } from '@/api/client'

export const useWordStore = defineStore('word', () => {
  const words = ref<Word[]>([])
  const currentWord = ref<Word | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchWordsByCategory = async (categoryId: string) => {
    loading.value = true
    error.value = null
    try {
      // Use public API for learning (no auth required)
      words.value = await learningApi.getWordsByCategory(categoryId)
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch words'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchAllWords = async (categoryId?: string) => {
    loading.value = true
    error.value = null
    try {
      words.value = await wordApi.getAll(categoryId)
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch words'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchWord = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const word = words.value.find(w => w.id === id)
      if (word) {
        currentWord.value = word
      }
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to fetch word'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createWord = async (data: CreateWordRequest) => {
    loading.value = true
    error.value = null
    try {
      const newWord = await wordApi.create(data)
      words.value.push(newWord)
      return newWord
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to create word'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateWord = async (id: number, data: UpdateWordRequest) => {
    loading.value = true
    error.value = null
    try {
      const updatedWord = await wordApi.update(id, data)
      const index = words.value.findIndex((w) => w.id === id)
      if (index !== -1) {
        words.value[index] = updatedWord
      }
      if (currentWord.value?.id === id) {
        currentWord.value = updatedWord
      }
      return updatedWord
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to update word'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteWord = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await wordApi.delete(id)
      words.value = words.value.filter((w) => w.id !== id)
      if (currentWord.value?.id === id) {
        currentWord.value = null
      }
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Failed to delete word'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    words,
    currentWord,
    loading,
    error,
    fetchWordsByCategory,
    fetchAllWords,
    fetchWord,
    createWord,
    updateWord,
    deleteWord,
  }
})
