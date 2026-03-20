export interface Word {
  id: string;
  emoji: string;
  english: string;
  chinese: string;
  phonetic: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  words: Word[];
}

export interface GameData {
  categories: Category[];
}

export interface DailyProgress {
  date: string;
  completed: number;
  total: number;
}

export interface Progress {
  stars: number;
  streak: number;
  lastStudyDate: string;
  completedWords: string[];
  dailyProgress: DailyProgress;
}

export type PlayLang = 'en' | 'zh';

// 吉祥物类型
export type MascotId = 'cat' | 'rabbit' | 'bear' | 'duck';

// 吉祥物状态
export type MascotState = 'idle' | 'learning' | 'happy' | 'celebrate';

// 吉祥物配置
export interface MascotConfig {
  id: MascotId;
  name: string;
  emoji: string;
  colors: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
  };
}
