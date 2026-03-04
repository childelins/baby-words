<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-3xl shadow-card p-8 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
      <h2 class="text-2xl font-bold mb-6 font-cute">
        {{ word ? '编辑单词' : '添加单词' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            分类
          </label>
          <select
            v-model.number="formData.categoryId"
            required
            class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
          >
            <option value="">请选择分类</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.nameZh }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            单词
          </label>
          <input
            v-model="formData.word"
            type="text"
            required
            class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            翻译
          </label>
          <input
            v-model="formData.translation"
            type="text"
            required
            class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            音标
          </label>
          <input
            v-model="formData.phonetic"
            type="text"
            required
            class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            音频URL
          </label>
          <input
            v-model="formData.audioUrl"
            type="url"
            class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            图片URL
          </label>
          <input
            v-model="formData.imageUrl"
            type="url"
            class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            例句
          </label>
          <input
            v-model="formData.exampleSentence"
            type="text"
            class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            例句翻译
          </label>
          <input
            v-model="formData.exampleTranslation"
            type="text"
            class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            难度 (1-5)
          </label>
          <input
            v-model.number="formData.difficulty"
            type="number"
            min="1"
            max="5"
            required
            class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
          />
        </div>

        <div class="flex gap-4 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
          >
            取消
          </button>
          <button
            type="submit"
            class="flex-1 px-6 py-3 bg-theme-animal text-white rounded-xl hover:bg-opacity-90 transition shadow-button"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Word, Category } from '@/types'

const props = defineProps<{
  word?: Word | null
  categories: Category[]
}>()

const emit = defineEmits<{
  close: []
  save: [data: Partial<Word>]
}>()

const formData = ref<Partial<Word>>({
  categoryId: 0,
  word: '',
  translation: '',
  phonetic: '',
  audioUrl: '',
  imageUrl: '',
  exampleSentence: '',
  exampleTranslation: '',
  difficulty: 1,
})

watch(
  () => props.word,
  (newWord) => {
    if (newWord) {
      formData.value = { ...newWord }
    } else {
      formData.value = {
        categoryId: props.categories[0]?.id || 0,
        word: '',
        translation: '',
        phonetic: '',
        audioUrl: '',
        imageUrl: '',
        exampleSentence: '',
        exampleTranslation: '',
        difficulty: 1,
      }
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('save', formData.value)
}
</script>
