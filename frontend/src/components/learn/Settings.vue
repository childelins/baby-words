<template>
  <div>
    <!-- 设置按钮 -->
    <button
      @click="isOpen = true"
      class="
        fixed top-4 right-4
        w-12 h-12 sm:w-14 sm:h-14 rounded-full
        bg-white/20 backdrop-blur-sm
        text-xl sm:text-2xl
        flex items-center justify-center
        transition-all duration-300
        hover:bg-white/40 hover:rotate-90
        z-50
      "
    >
      ⚙️
    </button>

    <!-- 弹窗 -->
    <div
      v-if="isOpen"
      class="
        fixed inset-0
        bg-black/60 backdrop-blur-sm
        flex items-center justify-center
        z-50 p-4
      "
      @click="isOpen = false"
    >
      <div
        class="
          bg-white rounded-4xl
          p-6 sm:p-8
          w-full max-w-md
          max-h-[80vh] overflow-y-auto
          animate-slide-in
        "
        @click.stop
      >
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
          🎙️ 选择声音
        </h2>

        <div class="space-y-3">
          <button
            v-for="profile in voiceProfiles"
            :key="profile.id"
            @click="handleSelectVoice(profile.id)"
            class="
              w-full flex items-center gap-4
              p-4 rounded-2xl
              transition-all duration-300
            "
            :class="currentVoice.id === profile.id
              ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-400'
              : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
            "
          >
            <span class="text-3xl">{{ profile.emoji }}</span>
            <div class="text-left">
              <div class="font-bold text-gray-800">{{ profile.name }}</div>
              <div class="text-sm text-gray-500">{{ profile.desc }}</div>
            </div>
            <span v-if="currentVoice.id === profile.id" class="ml-auto text-2xl">✓</span>
          </button>
        </div>

        <button
          @click="isOpen = false"
          class="
            w-full mt-6 py-4
            bg-gradient-to-r from-purple-500 to-pink-500
            text-white text-lg font-bold
            rounded-2xl
            transition-all duration-300
            hover:opacity-90
            active:scale-[0.98]
          "
        >
          完成
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSpeech, voiceProfiles, type VoiceProfile } from '@/hooks/useSpeech'

const { currentProfile, selectVoice } = useSpeech()

const isOpen = ref(false)

const currentVoice = currentProfile

const handleSelectVoice = (id: string) => {
  selectVoice(id)
}

// 关闭弹窗时停止语音
watch(isOpen, (newValue) => {
  if (!newValue && 'speechSynthesis' in window) {
    window.speechSynthesis?.cancel()
  }
})
</script>
