<template>
  <button
    @click="handleClick"
    class="
      relative overflow-hidden
      bg-gradient-to-br from-pink-400 to-purple-500
      rounded-2xl sm:rounded-3xl p-3 sm:p-4
      flex flex-col items-center gap-1 sm:gap-2
      shadow-soft
      transition-all duration-300 ease-out
      hover:scale-105 hover:-rotate-1 hover:shadow-card
      active:scale-95
      min-h-[100px] sm:min-h-[120px]
    "
    :class="categoryGradient"
  >
    <!-- 序号 -->
    <span class="absolute top-2 left-2 w-6 h-6 sm:w-7 sm:h-7 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-sm sm:text-base font-bold text-white shadow-sm">
      {{ index + 1 }}
    </span>

    <span class="text-3xl sm:text-4xl animate-bounce-slow">{{ categoryEmoji }}</span>
    <span class="text-sm sm:text-lg font-bold text-white drop-shadow-md text-center leading-tight">
      {{ categoryTitle }}
    </span>

    <!-- 装饰光晕 -->
    <div class="absolute -top-6 -right-6 w-20 h-20 bg-white/20 rounded-full blur-xl" />
    <div class="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 rounded-full blur-lg" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Category } from '@/types'

interface Props {
  category: Category
  index: number
}

const props = defineProps<Props>()
const router = useRouter()

// Use gradient from backend
const categoryGradient = computed(() => {
  return props.category.gradient || 'from-pink-400 to-purple-500'
})

const categoryEmoji = computed(() => props.category.emoji || '📚')

const categoryTitle = computed(() => props.category.title)

const handleClick = () => {
  router.push(`/learn/${props.category.id}`)
}
</script>
