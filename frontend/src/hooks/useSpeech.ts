import { ref, onMounted, onUnmounted } from 'vue'

export interface VoiceProfile {
  id: string
  name: string
  desc: string
  emoji: string
  preferredVoices: {
    zh: string[]
    en: string[]
  }
  rate: number
  pitch: number
}

export const voiceProfiles: VoiceProfile[] = [
  {
    id: 'female',
    name: '姐姐',
    desc: '温柔女声',
    emoji: '👧',
    pitch: 1.2,
    rate: 0.75,
    preferredVoices: {
      zh: ['Ting-Ting', 'Yaoyao', 'Sin-Ji', 'Microsoft Huihui', 'Xiaoxiao', 'zh-CN', 'zh'],
      en: ['Samantha', 'Karen', 'Microsoft Zira', 'Victoria', 'en-US', 'en']
    }
  },
  {
    id: 'male',
    name: '哥哥',
    desc: '阳光男声',
    emoji: '👦',
    pitch: 1.0,
    rate: 0.75,
    preferredVoices: {
      zh: ['Kangkang', 'Microsoft Kangkang', 'Yaoyao', 'zh-CN', 'zh'],
      en: ['Alex', 'Daniel', 'Microsoft David', 'Google UK English Male', 'en-US', 'en']
    }
  },
  {
    id: 'child',
    name: '宝宝',
    desc: '童声萌音',
    emoji: '👶',
    pitch: 1.5,
    rate: 0.75,
    preferredVoices: {
      zh: ['Ting-Ting', 'Yaoyao', 'Microsoft Huihui', 'zh-CN', 'zh'],
      en: ['Samantha', 'Karen', 'Microsoft Zira', 'en-US', 'en']
    }
  },
  {
    id: 'teacher',
    name: '老师',
    desc: '标准发音',
    emoji: '👩‍🏫',
    pitch: 1.0,
    rate: 0.8,
    preferredVoices: {
      zh: ['Ting-Ting', 'Yaoyao', 'Microsoft Huihui', 'zh-CN', 'zh'],
      en: ['Samantha', 'Alex', 'Microsoft Zira', 'en-US', 'en']
    }
  }
]

export function useSpeech() {
  const speaking = ref(false)
  const supported = 'speechSynthesis' in window
  const voicesLoaded = ref(false)
  const currentProfile = ref<VoiceProfile>(() => {
    const savedId = localStorage.getItem('babyWordsVoice')
    return voiceProfiles.find(p => p.id === savedId) || voiceProfiles[0]
  })()
  let isPlaying = false

  // 等待声音列表加载
  const checkVoices = () => {
    if (supported) {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        voicesLoaded.value = true
      }
    }
  }

  onMounted(() => {
    checkVoices()
    if (supported) {
      window.speechSynthesis.onvoiceschanged = checkVoices
    }
  })

  onUnmounted(() => {
    if (supported) {
      window.speechSynthesis.onvoiceschanged = null
    }
  })

  // 获取匹配的声音
  const getVoice = (lang: 'zh' | 'en') => {
    if (!supported) return null

    const voices = window.speechSynthesis.getVoices()
    if (voices.length === 0) return null

    const preferred = currentProfile.value.preferredVoices[lang]
    const langCode = lang === 'zh' ? 'zh' : 'en'

    // 1. 优先匹配首选声音名称
    for (const name of preferred) {
      const found = voices.find(v =>
        v.name.toLowerCase().includes(name.toLowerCase())
      )
      if (found) return found
    }

    // 2. 匹配语言代码（严格匹配 en-US, en-GB 等）
    const langVoice = voices.find(v =>
      v.lang.toLowerCase().startsWith(langCode)
    )
    if (langVoice) return langVoice

    // 3. 英文额外尝试：查找任何包含 "english" 的声音
    if (lang === 'en') {
      const englishVoice = voices.find(v =>
        v.name.toLowerCase().includes('english')
      )
      if (englishVoice) return englishVoice
    }

    // 4. 最后尝试：不要返回可能的中英错误声音
    if (lang === 'en') {
      return null
    }

    return voices[0]
  }

  // 朗读文本
  const speak = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!supported || !text) {
        resolve()
        return
      }

      // 取消之前的播放
      window.speechSynthesis.cancel()

      const lang = /[\u4e00-\u9fa5]/.test(text) ? 'zh' : 'en'
      const utterance = new SpeechSynthesisUtterance(text)
      const voice = getVoice(lang)

      // 先设置语言（最重要，即使没有找到特定声音）
      utterance.lang = lang === 'zh' ? 'zh-CN' : 'en-US'

      // 如果找到特定声音，使用它
      if (voice) {
        utterance.voice = voice
      }

      utterance.rate = currentProfile.value.rate
      utterance.pitch = currentProfile.value.pitch
      utterance.volume = 1

      utterance.onstart = () => {
        speaking.value = true
      }

      utterance.onend = () => {
        speaking.value = false
        resolve()
      }

      utterance.onerror = () => {
        speaking.value = false
        resolve()
      }

      // 延迟播放，确保声音加载完成
      setTimeout(() => {
        window.speechSynthesis.speak(utterance)
      }, 50)
    })
  }

  // 朗读单词（先英文后中文）
  const speakWord = async (en: string, cn: string) => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      isPlaying = false
    }

    isPlaying = true
    await speak(en)

    // 英文和中文之间短暂停顿
    await new Promise(r => setTimeout(r, 200))

    await speak(cn)
    isPlaying = false
  }

  // 朗读中文
  const speakChinese = (text: string): Promise<void> => {
    return speak(text)
  }

  // 朗读英文
  const speakEnglish = (text: string): Promise<void> => {
    return speak(text)
  }

  // 选择声音
  const selectVoice = (profileId: string) => {
    const profile = voiceProfiles.find(p => p.id === profileId)
    if (profile) {
      currentProfile.value = profile
      localStorage.setItem('babyWordsVoice', profileId)
      // 试听
      speakWord('apple', '苹果')
    }
  }

  // 取消发音
  const cancel = (): void => {
    if (supported) {
      window.speechSynthesis.cancel()
      speaking.value = false
      isPlaying = false
    }
  }

  return {
    speaking,
    supported,
    voicesLoaded,
    currentProfile,
    voiceProfiles,
    speak,
    speakWord,
    speakChinese,
    speakEnglish,
    selectVoice,
    cancel,
  }
}
