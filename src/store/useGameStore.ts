import { create } from 'zustand';
import type { Category, Progress, PlayLang } from '../types';
import { loadProgress, saveProgress, resetProgress as resetStorage } from '../utils/storage';
import { speak, stopSpeaking } from '../utils/tts';
import gameData from '../data/words.json';

interface GameState {
  // 数据
  categories: Category[];

  // 当前状态
  currentCategory: Category | null;
  currentWordIndex: number;

  // 播放状态
  isPlaying: boolean;
  playingLang: PlayLang | null;

  // 进度
  progress: Progress;

  // 完成弹窗
  showCompleteModal: boolean;

  // 卡片切换方向
  slideDirection: 'left' | 'right' | null;

  // Actions
  selectCategory: (categoryId: string) => void;
  goToHome: () => void;
  nextWord: () => void;
  prevWord: () => void;
  playAudio: (lang: PlayLang) => Promise<void>;
  playAutoSequence: () => Promise<void>;
  stopAudio: () => void;
  markWordComplete: () => void;
  resetProgress: () => void;
  closeCompleteModal: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  categories: gameData.categories as Category[],
  currentCategory: null,
  currentWordIndex: 0,
  isPlaying: false,
  playingLang: null,
  progress: loadProgress(),
  showCompleteModal: false,
  slideDirection: null,

  selectCategory: (categoryId: string) => {
    const category = get().categories.find((c) => c.id === categoryId);
    if (category) {
      set({
        currentCategory: category,
        currentWordIndex: 0,
        showCompleteModal: false,
        slideDirection: null,
      });
    }
  },

  goToHome: () => {
    stopSpeaking();
    set({
      currentCategory: null,
      currentWordIndex: 0,
      isPlaying: false,
      playingLang: null,
      showCompleteModal: false,
      slideDirection: null,
    });
  },

  nextWord: () => {
    const { currentCategory, currentWordIndex, markWordComplete } = get();
    if (!currentCategory) return;

    // 标记当前单词完成
    markWordComplete();

    if (currentWordIndex < currentCategory.words.length - 1) {
      set({ currentWordIndex: currentWordIndex + 1, slideDirection: 'left' });
    } else {
      // 已经是最后一个单词，显示完成弹窗
      set({ showCompleteModal: true });
    }
  },

  prevWord: () => {
    const { currentCategory, currentWordIndex } = get();
    if (!currentCategory || currentWordIndex <= 0) return;

    set({ currentWordIndex: currentWordIndex - 1, slideDirection: 'right' });
  },

  playAudio: async (lang: PlayLang) => {
    const { currentCategory, currentWordIndex } = get();
    if (!currentCategory) return;

    const word = currentCategory.words[currentWordIndex];
    const text = lang === 'en' ? word.english : word.chinese;

    set({ isPlaying: true, playingLang: lang });
    await speak(text, lang);
    set({ isPlaying: false, playingLang: null });
  },

  playAutoSequence: async () => {
    const { currentCategory, currentWordIndex } = get();
    if (!currentCategory) return;

    const word = currentCategory.words[currentWordIndex];

    // 播放英文
    set({ isPlaying: true, playingLang: 'en' });
    await speak(word.english, 'en');

    // 短暂延迟
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 播放中文
    set({ playingLang: 'zh' });
    await speak(word.chinese, 'zh');

    set({ isPlaying: false, playingLang: null });
  },

  stopAudio: () => {
    stopSpeaking();
    set({ isPlaying: false, playingLang: null });
  },

  markWordComplete: () => {
    const { currentCategory, currentWordIndex, progress } = get();
    if (!currentCategory) return;

    const word = currentCategory.words[currentWordIndex];
    const today = new Date().toISOString().split('T')[0];

    // 检查是否已经完成过这个单词
    if (progress.completedWords.includes(word.id)) {
      return;
    }

    const newProgress: Progress = {
      ...progress,
      stars: progress.stars + 1,
      lastStudyDate: today,
      completedWords: [...progress.completedWords, word.id],
      dailyProgress: {
        ...progress.dailyProgress,
        completed: progress.dailyProgress.completed + 1,
      },
    };

    saveProgress(newProgress);
    set({ progress: newProgress });
  },

  resetProgress: () => {
    const fresh = resetStorage();
    set({ progress: fresh });
  },

  closeCompleteModal: () => {
    set({ showCompleteModal: false });
  },
}));
