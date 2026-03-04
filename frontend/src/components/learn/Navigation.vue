<template>
  <div class="flex flex-col items-center gap-4 mt-6">
    <!-- 进度 -->
    <div class="text-white text-xl font-bold drop-shadow-md">
      {{ current }} / {{ total }}
    </div>

    <!-- 导航按钮 -->
    <div class="flex gap-4">
      <!-- 首页 -->
      <button
        @click="$emit('home')"
        class="
          w-16 h-16 sm:w-20 sm:h-20 rounded-full
          bg-gradient-to-br from-yellow-300 to-orange-400
          text-2xl sm:text-3xl
          flex items-center justify-center
          shadow-button
          transition-all duration-300
          hover:scale-110
          active:scale-95
        "
      >
        🏠
      </button>

      <!-- 上一张 -->
      <button
        @click="$emit('prev')"
        class="
          w-16 h-16 sm:w-20 sm:h-20 rounded-full
          bg-gradient-to-br from-red-400 to-pink-500
          text-white text-2xl sm:text-3xl
          flex items-center justify-center
          shadow-button
          transition-all duration-300
          hover:scale-110
          active:scale-95
        "
      >
        ◀
      </button>

      <!-- 下一张 -->
      <button
        @click="$emit('next')"
        class="
          w-16 h-16 sm:w-20 sm:h-20 rounded-full
          bg-gradient-to-br from-green-400 to-teal-500
          text-white text-2xl sm:text-3xl
          flex items-center justify-center
          shadow-button
          transition-all duration-300
          hover:scale-110
          active:scale-95
        "
      >
        ▶
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentIndex?: number
  current: number
  total: number
}

defineProps<Props>()

defineEmits<{
  prev: []
  next: []
  home: []
}>()
</script>
