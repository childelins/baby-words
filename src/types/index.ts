export type PlayLang = 'en' | 'zh';

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
