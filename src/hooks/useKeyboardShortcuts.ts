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
      let key = '';

      // 处理数字键（主键盘 Digit1-Digit0）
      if (e.code.startsWith('Digit')) {
        key = e.code.replace('Digit', '');
      }
      // 处理数字键（小键盘 Numpad1-Numpad0，排除小数点）
      else if (e.code.startsWith('Numpad') && e.code !== 'NumpadDecimal') {
        key = e.code.replace('Numpad', '');
      }
      // 处理字母键（KeyQ, KeyW, etc.）
      else if (e.code.startsWith('Key')) {
        key = e.code.replace('Key', '');
      }
      // 其他按键使用 key 属性
      else {
        key = e.key.toUpperCase();
      }

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
