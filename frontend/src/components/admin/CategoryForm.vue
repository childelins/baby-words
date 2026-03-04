<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-3xl shadow-card p-8 w-full max-w-md mx-4">
      <h2 class="text-2xl font-bold mb-6 font-cute">
        {{ category ? '编辑分类' : '添加分类' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            中文名称
          </label>
          <input
            v-model="formData.nameZh"
            type="text"
            required
            class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            英文名称
          </label>
          <input
            v-model="formData.nameEn"
            type="text"
            required
            class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            图标
          </label>
          <input
            v-model="formData.icon"
            type="text"
            required
            class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
            placeholder="🐱"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            颜色
          </label>
          <input
            v-model="formData.color"
            type="color"
            required
            class="w-full h-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            描述
          </label>
          <textarea
            v-model="formData.description"
            required
            class="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-theme-animal focus:border-transparent outline-none"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            排序
          </label>
          <input
            v-model.number="formData.order"
            type="number"
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
import type { Category } from '@/types'

const props = defineProps<{
  category?: Category | null
}>()

const emit = defineEmits<{
  close: []
  save: [data: Partial<Category>]
}>()

const formData = ref<Partial<Category>>({
  nameZh: '',
  nameEn: '',
  name: '',
  icon: '',
  color: '#D2691E',
  description: '',
  order: 0,
})

watch(
  () => props.category,
  (newCategory) => {
    if (newCategory) {
      formData.value = { ...newCategory }
    } else {
      formData.value = {
        nameZh: '',
        nameEn: '',
        name: '',
        icon: '',
        color: '#D2691E',
        description: '',
        order: 0,
      }
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('save', formData.value)
}
</script>
