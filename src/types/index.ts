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
