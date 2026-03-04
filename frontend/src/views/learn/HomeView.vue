<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex flex-col items-center p-4 sm:p-6 relative overflow-y-auto">
    <!-- 背景装饰 -->
    <span
      v-for="(emoji, i) in decorations"
      :key="i"
      class="absolute text-4xl sm:text-6xl opacity-10 animate-float pointer-events-none"
      :style="{
        top: decorationPositions[i].top,
        left: decorationPositions[i].left,
        right: decorationPositions[i].right,
        animationDelay: `${i * 0.5}s`
      }"
    >
      {{ emoji }}
    </span>

    <!-- 设置 -->
    <Settings />

    <!-- 标题 -->
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600 mt-6 mb-6 sm:mb-8 text-center animate-bounce-slow drop-shadow-lg shrink-0">
      宝宝学单词
    </h1>

    <!-- 加载状态 -->
    <div v-if="loading" class="flex items-center justify-center flex-1">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="flex items-center justify-center flex-1">
      <div class="text-center text-red-500">
        <p class="text-lg mb-2">加载失败</p>
        <p class="text-sm">{{ error }}</p>
        <button
          @click="retry"
          class="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          重试
        </button>
      </div>
    </div>

    <!-- 分类卡片 -->
    <div v-else class="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl pb-6">
      <CategoryCard
        v-for="(category, index) in categories"
        :key="category.id"
        :category="category"
        :index="index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'
import CategoryCard from '@/components/learn/CategoryCard.vue'
import Settings from '@/components/learn/Settings.vue'

const categoryStore = useCategoryStore()

const decorations = ['🌟', '🎈', '🌈', '🦋']

const decorationPositions = [
  { top: '5%', left: '5%', right: 'auto' },
  { top: '15%', left: 'auto', right: '10%' },
  { top: '75%', left: '8%', right: 'auto' },
  { top: '85%', left: 'auto', right: '5%' }
]

const { categories, loading, error } = categoryStore

const fetchCategories = async () => {
  try {
    await categoryStore.fetchCategories()
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
}

const retry = () => {
  fetchCategories()
}

onMounted(() => {
  fetchCategories()
})
</script>
