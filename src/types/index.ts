// 单词类型
export interface Word {
  emoji: string
  cn: string
  en: string
}

// 分类类型
export interface Category {
  id: string
  title: string
  emoji: string
  gradient: string
  words: Word[]
}

// 声音配置类型
export interface VoiceProfile {
  id: string
  name: string
  desc: string
  emoji: string
  pitch: number
  rate: number
  preferredVoices: {
    zh: string[]
    en: string[]
  }
}

// 应用状态类型
export interface AppState {
  currentCategory: string | null
  currentIndex: number
  selectedVoice: string
}
