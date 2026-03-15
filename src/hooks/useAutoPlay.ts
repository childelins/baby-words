import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';

export function useAutoPlay() {
  const { currentCategory, currentWordIndex, playAutoSequence, isPlaying } = useGameStore();
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
}
