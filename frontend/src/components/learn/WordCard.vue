<template>
  <div
    @click="handleSpeak"
    class="
      relative w-full aspect-square max-w-[360px] sm:max-w-[400px]
      bg-white rounded-4xl
      flex flex-col items-center justify-center
      shadow-card
      cursor-pointer
      transition-transform duration-300
      hover:scale-[1.02]
      active:scale-[0.98]
      overflow-hidden
    "
  >
    <!-- 星星特效 -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <span
        v-for="star in stars"
        :key="star.id"
        class="absolute text-2xl animate-star-fly"
        :style="{
          left: `${star.left}%`,
          top: `${star.top}%`,
          animationDelay: `${star.delay}s`
        }"
      >
        {{ star.emoji }}
      </span>
    </div>

    <!-- Emoji -->
    <span
      class="text-7xl sm:text-8xl"
      :class="{ 'animate-wiggle': animateWiggle }"
    >
      {{ wordEmoji }}
    </span>

    <!-- 中文 -->
    <span class="text-3xl sm:text-4xl text-gray-800 mt-3 font-bold">
      {{ wordCn }}
    </span>

    <!-- 英文 -->
    <span class="text-xl sm:text-2xl text-gray-500 mt-1">
      {{ wordEn }}
    </span>

    <!-- 发音按钮 -->
    <button
      @click.stop="handleSpeak"
      class="
        absolute bottom-4 right-4
        w-14 h-14 rounded-full
        bg-gradient-to-br from-blue-400 to-blue-500
        text-white text-2xl
        flex items-center justify-center
        shadow-button
        transition-all duration-300
        hover:scale-110 hover:shadow-lg
        active:scale-95
      "
    >
      🔊
    </button>

    <!-- 装饰 -->
    <div class="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { Word } from '@/types'

interface Props {
  word: Word
  current?: number
  total?: number
  onSpeak?: () => void
}

const props = defineProps<Props>()
const emit = defineEmits<{
  speak: []
}>()

const starEmojis = ['⭐', '✨', '🌟', '💫', '🎉', '🎊']

interface Star {
  id: number
  emoji: string
  left: number
  top: number
  delay: number
}

const stars = ref<Star[]>([])
const animateWiggle = ref(true)

// 触发星星特效
const triggerStars = () => {
  const newStars: Star[] = Array.from({ length: 8 }, (_, i) => ({
    id: Date.now() + i,
    emoji: starEmojis[Math.floor(Math.random() * starEmojis.length)],
    left: Math.random() * 80 + 10,
    top: Math.random() * 80 + 10,
    delay: Math.random() * 0.3
  }))
  stars.value = newStars

  // 清理星星
  setTimeout(() => {
    stars.value = []
  }, 1000)
}

// 重置动画
const resetAnimation = async () => {
  animateWiggle.value = false
  await nextTick()
  setTimeout(() => {
    animateWiggle.value = true
  }, 10)
}

const wordEmoji = computed(() => props.word.emoji)
const wordCn = computed(() => props.word.cn)
const wordEn = computed(() => props.word.en)

const handleSpeak = () => {
  if (props.onSpeak) {
    props.onSpeak()
  } else {
    emit('speak')
  }
}

// 监听 word 变化触发特效
watch(() => props.word, () => {
  triggerStars()
  resetAnimation()
}, { immediate: true })
</script>
