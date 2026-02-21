import { useCallback, useRef, useState, useEffect } from 'react'
import { VoiceProfile } from '@/types'
import { voiceProfiles } from '@/data/voices'

export function useSpeech() {
  const [currentProfile, setCurrentProfile] = useState<VoiceProfile>(() => {
    const savedId = localStorage.getItem('babyWordsVoice')
    return voiceProfiles.find(p => p.id === savedId) || voiceProfiles[0]
  })
  const [voicesLoaded, setVoicesLoaded] = useState(false)
  const isPlaying = useRef(false)

  // 等待声音列表加载
  useEffect(() => {
    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        setVoicesLoaded(true)
      }
    }

    checkVoices()
    window.speechSynthesis.onvoiceschanged = checkVoices

    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  // 获取匹配的声音
  const getVoice = useCallback((lang: 'zh' | 'en') => {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length === 0) return null

    const preferred = currentProfile.preferredVoices[lang]
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
    // 如果是英文且没找到，返回 null 让浏览器使用默认
    if (lang === 'en') {
      return null
    }

    return voices[0]
  }, [currentProfile])

  // 朗读文本
  const speak = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!text) {
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

      utterance.rate = currentProfile.rate
      utterance.pitch = currentProfile.pitch
      utterance.volume = 1

      utterance.onend = () => resolve()
      utterance.onerror = () => resolve()

      // 延迟播放，确保声音加载完成
      setTimeout(() => {
        window.speechSynthesis.speak(utterance)
      }, 50)
    })
  }, [currentProfile, getVoice])

  // 朗读单词（先英文后中文）
  const speakWord = useCallback(async (en: string, cn: string) => {
    if (isPlaying.current) {
      window.speechSynthesis.cancel()
      isPlaying.current = false
    }

    isPlaying.current = true
    await speak(en)

    // 英文和中文之间短暂停顿
    await new Promise(r => setTimeout(r, 200))

    await speak(cn)
    isPlaying.current = false
  }, [speak])

  // 选择声音
  const selectVoice = useCallback((profileId: string) => {
    const profile = voiceProfiles.find(p => p.id === profileId)
    if (profile) {
      setCurrentProfile(profile)
      localStorage.setItem('babyWordsVoice', profileId)
      // 试听
      speakWord('apple', '苹果')
    }
  }, [speakWord])

  return {
    speak,
    speakWord,
    selectVoice,
    currentProfile,
    voiceProfiles,
    voicesLoaded
  }
}
