import { useEffect, useState } from 'react';
import type { MascotId } from '../types';
import { defaultMascot } from '../components/Mascot/mascotConfig';

const STORAGE_KEY = 'mascot';

export function useMascotTheme() {
  const [mascot, setMascotState] = useState<MascotId>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as MascotId) || defaultMascot;
  });

  // 初始化时应用主题
  useEffect(() => {
    document.documentElement.setAttribute('data-mascot', mascot);
  }, []);

  const setMascot = (newMascot: MascotId) => {
    setMascotState(newMascot);
    localStorage.setItem(STORAGE_KEY, newMascot);
    document.documentElement.setAttribute('data-mascot', newMascot);
  };

  return { mascot, setMascot };
}
