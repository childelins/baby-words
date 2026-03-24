import { useEffect, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';

// 快捷键映射字符串：数字 1-0 + 字母 Q-M（按键盘顺序）
const SHORTCUT_KEYS = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';

export function useKeyboardShortcuts() {
  const {
    categories,
    selectCategory,
    isPlaying,
    stopAudio,
    showCompleteModal,
    closeCompleteModal,
  } = useGameStore();

  // 生成快捷键到分类 ID 的映射
  const getShortcutMap = useCallback(() => {
    const map: Record<string, string> = {};
    categories.forEach((cat, index) => {
      if (index < SHORTCUT_KEYS.length) {
        map[SHORTCUT_KEYS[index]] = cat.id;
      }
    });
    return map;
  }, [categories]);

  useEffect(() => {
    const shortcutMap = getShortcutMap();

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      // 检查是否是快捷键
      const categoryId = shortcutMap[key];
      if (categoryId) {
        e.preventDefault();

        // 如果正在播放音频，先停止
        if (isPlaying) {
          stopAudio();
        }

        // 如果完成弹窗打开，先关闭
        if (showCompleteModal) {
          closeCompleteModal();
        }

        selectCategory(categoryId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [getShortcutMap, selectCategory, isPlaying, stopAudio, showCompleteModal, closeCompleteModal]);
}

// 导出快捷键字符串供其他组件使用
export { SHORTCUT_KEYS };
