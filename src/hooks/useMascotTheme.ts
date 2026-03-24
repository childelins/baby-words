import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import type { MascotId } from '../types';

const STORAGE_KEY = 'mascot';

export function useMascotTheme() {
  const mascot = useGameStore((state) => state.mascot);
  const setMascotState = useGameStore((state) => state.setMascot);

  // 初始化时从 localStorage 加载
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as MascotId | null;
    if (stored && stored !== mascot) {
      setMascotState(stored);
    }
    document.documentElement.setAttribute('data-mascot', mascot);
  }, []);

  const setMascot = (newMascot: MascotId) => {
    setMascotState(newMascot);
    localStorage.setItem(STORAGE_KEY, newMascot);
    document.documentElement.setAttribute('data-mascot', newMascot);
  };

  return { mascot, setMascot };
}
