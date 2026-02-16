import { VoiceProfile } from '@/types'

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
