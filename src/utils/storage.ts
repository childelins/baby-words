import type { Progress } from '../types';

const STORAGE_KEY = 'baby-words-progress';

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

const defaultProgress: Progress = {
  stars: 0,
  streak: 0,
  lastStudyDate: '',
  completedWords: [],
  dailyProgress: {
    date: getTodayDate(),
    completed: 0,
    total: 10,
  },
};

export function loadProgress(): Progress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { ...defaultProgress };
    }
    const progress = JSON.parse(stored) as Progress;

    // 检查是否是新的一天
    const today = getTodayDate();
    if (progress.dailyProgress.date !== today) {
      // 检查连续学习
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (progress.lastStudyDate === yesterdayStr) {
        progress.streak += 1;
      } else if (progress.lastStudyDate !== today) {
        progress.streak = 0;
      }

      // 重置每日进度
      progress.dailyProgress = {
        date: today,
        completed: 0,
        total: 10,
      };
    }

    return progress;
  } catch {
    return { ...defaultProgress };
  }
}

export function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export function resetProgress(): Progress {
  const fresh = { ...defaultProgress };
  saveProgress(fresh);
  return fresh;
}
