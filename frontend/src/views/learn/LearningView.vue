<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
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
          @click="router.push('/')"
          class="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
        >
          返回首页
        </button>
      </div>
    </div>

    <!-- 学习内容 -->
    <template v-else>
      <!-- 设置 -->
      <Settings />

      <!-- 分类标题 -->
      <h2 class="text-2xl sm:text-3xl font-bold text-orange-600 mb-6 drop-shadow-md animate-bounce-slow">
        {{ categoryEmoji }} {{ categoryTitle }}
      </h2>

      <!-- 单词卡片 -->
      <WordCard
        v-if="currentWord"
        :word="currentWord"
        :current="currentIndex + 1"
        :total="words.length"
        @speak="handleSpeak"
      />

      <!-- 导航 -->
      <Navigation
        :current="currentIndex + 1"
        :total="words.length"
        @prev="handlePrev"
        @next="handleNext"
        @home="handleHome"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWordStore } from '@/stores/word'
import { useCategoryStore } from '@/stores/category'
import { useSpeech } from '@/hooks/useSpeech'
import { learningApi } from '@/api/client'
import WordCard from '@/components/learn/WordCard.vue'
import Navigation from '@/components/learn/Navigation.vue'
import Settings from '@/components/learn/Settings.vue'
import type { Word } from '@/types'

const route = useRoute()
const router = useRouter()
const wordStore = useWordStore()
const categoryStore = useCategoryStore()
const { speakEnglish, speakChinese } = useSpeech()

const decorations = ['🌟', '🎈', '🌈', '🦋']

const decorationPositions = [
  { top: '10%', left: '5%', right: 'auto' },
  { top: '20%', left: 'auto', right: '10%' },
  { top: '70%', left: '8%', right: 'auto' },
  { top: '80%', left: 'auto', right: '5%' }
]

const currentIndex = ref(0)
const speakTimeout = ref<number | null>(null)

const categoryId = computed(() => route.params.categoryId as string)

const { words, loading, error } = wordStore

const category = computed(() => {
  return categoryStore.categories.find(c => c.id === categoryId.value)
})

const categoryEmoji = computed(() => category.value?.emoji || '📚')
const categoryTitle = computed(() => category.value?.title || '学习')

const currentWord = computed(() => words.value[currentIndex.value])

// 播放发音
const handleSpeak = async () => {
  if (!currentWord.value) return

  // 记录学习活动
  await logLearningActivity('speak')

  // 先英文后中文
  await speakEnglish(currentWord.value.en)

  // 英文和中文之间短暂停顿
  await new Promise(r => setTimeout(r, 200))

  await speakChinese(currentWord.value.cn)
}

// 上一张
const handlePrev = () => {
  if (words.value.length > 0) {
    currentIndex.value = (currentIndex.value - 1 + words.value.length) % words.value.length
  }
}

// 下一张
const handleNext = () => {
  if (words.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % words.value.length
  }
}

// 返回首页
const handleHome = () => {
  router.push('/')
}

// 记录学习活动
const logLearningActivity = async (action: 'view' | 'speak' = 'speak') => {
  if (!currentWord.value) return

  try {
    await learningApi.log(currentWord.value.id, action)
  } catch (err) {
    console.error('Failed to log learning activity:', err)
  }
}

// 键盘支持
const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowLeft':
      handlePrev()
      break
    case 'ArrowRight':
      handleNext()
      break
    case ' ':
      e.preventDefault()
      handleSpeak()
      break
    case 'Escape':
      handleHome()
      break
  }
}

// 自动播放当前单词
const autoSpeak = () => {
  if (speakTimeout.value) {
    clearTimeout(speakTimeout.value)
  }
  speakTimeout.value = window.setTimeout(() => {
    handleSpeak()
  }, 300)
}

// 监听当前索引变化，自动播放
watch(currentIndex, async () => {
  // 记录浏览
  await logLearningActivity('view')
  autoSpeak()
})

// 监听分类变化，重置索引
watch(categoryId, () => {
  currentIndex.value = 0
})

// 加载单词数据
const loadWords = async () => {
  try {
    await wordStore.fetchWordsByCategory(categoryId.value)
  } catch (err) {
    console.error('Failed to fetch words:', err)
  }
}

onMounted(async () => {
  // 加载分类列表
  if (categoryStore.categories.length === 0) {
    await categoryStore.fetchCategories()
  }

  // 加载单词
  await loadWords()

  // 添加键盘事件监听
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  // 清理
  if (speakTimeout.value) {
    clearTimeout(speakTimeout.value)
  }
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
