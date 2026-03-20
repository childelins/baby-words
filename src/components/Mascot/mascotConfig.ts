import type { MascotConfig, MascotId, MascotState } from '../../types';

// 吉祥物配置
export const mascots: Record<MascotId, MascotConfig> = {
  cat: {
    id: 'cat',
    name: '小紫猫',
    emoji: '😺',
    colors: {
      50: '#FEF7FF',
      100: '#F3E8FF',
      200: '#E9D5FF',
      300: '#D8B4FE',
      400: '#C084FC',
      500: '#A855F7',
      600: '#8B5CF6',
      700: '#7C3AED',
    },
  },
  rabbit: {
    id: 'rabbit',
    name: '小粉兔',
    emoji: '🐰',
    colors: {
      50: '#FDF2F8',
      100: '#FCE7F3',
      200: '#FBCFE8',
      300: '#F9A8D4',
      400: '#F472B6',
      500: '#EC4899',
      600: '#DB2777',
      700: '#BE185D',
    },
  },
  bear: {
    id: 'bear',
    name: '小蓝熊',
    emoji: '🐻',
    colors: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
    },
  },
  duck: {
    id: 'duck',
    name: '小黄鸭',
    emoji: '🐤',
    colors: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
    },
  },
};

// 默认吉祥物
export const defaultMascot: MascotId = 'cat';

// 吉祥物 ID 列表
export const mascotIds: MascotId[] = ['cat', 'rabbit', 'bear', 'duck'];

// 状态对应的表情映射
export const stateEmojis: Record<MascotState, Record<MascotId, string>> = {
  idle: {
    cat: '😺',
    rabbit: '🐰',
    bear: '🐻',
    duck: '🐤',
  },
  learning: {
    cat: '😸',
    rabbit: '😻',
    bear: '🐻‍❄️',
    duck: '🦆',
  },
  happy: {
    cat: '😻',
    rabbit: '💕',
    bear: '🧸',
    duck: '🌟',
  },
  celebrate: {
    cat: '🥳',
    rabbit: '🎉',
    bear: '🎊',
    duck: '✨',
  },
};

// 状态对应的对话消息
export const stateMessages: Record<MascotState, string[]> = {
  idle: ['加油学习哦~', '你真棒！', '继续加油！', '太厉害了！', '你最棒！'],
  learning: ['正在播放英文~', '正在播放中文~'],
  happy: ['好棒！', '学会了！', '太厉害了！'],
  celebrate: ['全部学完啦！🎉', '你太棒了！🎊', '继续加油！💪'],
};

// 获取随机消息
export function getRandomMessage(state: MascotState): string {
  const messages = stateMessages[state];
  return messages[Math.floor(Math.random() * messages.length)];
}
