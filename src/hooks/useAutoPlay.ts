import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';

export function useAutoPlay() {
  const {
    currentCategory,
    currentWordIndex,
    playAutoSequence,
    isPlaying,
    nextWord,
    prevWord,
    goToHome
  } = useGameStore();
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    // 当切换分类或单词时，重置播放状态
    hasPlayedRef.current = false;
  }, [currentCategory?.id, currentWordIndex]);

  useEffect(() => {
    // 自动播放（延迟 500ms）
    if (currentCategory && !hasPlayedRef.current && !isPlaying) {
      hasPlayedRef.current = true;
      const timer = setTimeout(() => {
        playAutoSequence();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentCategory, currentWordIndex, playAutoSequence, isPlaying]);

  // 键盘事件处理
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!currentCategory) return;

    switch (e.key) {
      case ' ':
        // Space 键重复播放发音
        e.preventDefault();
        if (!isPlaying) {
          playAutoSequence();
        }
        break;
      case 'ArrowLeft':
        // 左箭头：上一个单词
        e.preventDefault();
        prevWord();
        break;
      case 'ArrowRight':
        // 右箭头：下一个单词
        e.preventDefault();
        nextWord();
        break;
      case 'Home':
        // Home 键：返回主页
        e.preventDefault();
        goToHome();
        break;
    }
  }, [currentCategory, isPlaying, playAutoSequence, prevWord, nextWord, goToHome]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
