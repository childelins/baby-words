import { useEffect, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';

// 快捷键映射字符串：字母 Q-M（按键盘顺序）
const SHORTCUT_KEYS = 'QWERTYUIOPASDFGHJKLZXCVBNM';

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
        const key = SHORTCUT_KEYS[index];
        console.log(`索引 ${index}: 快捷键 "${key}" (类型: ${typeof key}), 分类: ${cat.id}`);
        map[key] = cat.id;
      }
    });
    console.log('生成的快捷键映射:', map);
    console.log('按键 "1" 的类别:', map['1']);
    return map;
  }, [categories]);

  useEffect(() => {
    const shortcutMap = getShortcutMap();

    const handleKeyDown = (e: KeyboardEvent) => {
      let key = '';

      // 调试日志
      console.log('=== 按键检测 ===');
      console.log('e.code:', e.code);
      console.log('e.key:', e.key);

      // 处理数字键（主键盘 Digit1-Digit0）
      if (e.code.startsWith('Digit')) {
        key = e.code.replace('Digit', '');
        console.log('检测到 Digit，提取的 key:', key);
      }
      // 处理数字键（小键盘 Numpad1-Numpad0，排除小数点）
      else if (e.code.startsWith('Numpad') && e.code !== 'NumpadDecimal') {
        key = e.code.replace('Numpad', '');
        console.log('检测到 Numpad，提取的 key:', key);
      }
      // 处理字母键（KeyQ, KeyW, etc.）
      else if (e.code.startsWith('Key')) {
        key = e.code.replace('Key', '');
        console.log('检测到 Key，提取的 key:', key);
      }
      // 其他按键使用 key 属性
      else {
        key = e.key.toUpperCase();
        console.log('使用 e.key，提取的 key:', key);
      }

      // 检查是否是快捷键
      const categoryId = shortcutMap[key];
      console.log('shortcutMap:', shortcutMap);
      console.log('匹配的 categoryId:', categoryId);

      if (categoryId) {
        e.preventDefault();

        // 调试：检查 selectCategory 函数
        console.log('准备调用 selectCategory, categoryId:', categoryId);
        console.log('selectCategory 函数:', typeof selectCategory);

        // 如果正在播放音频，先停止
        if (isPlaying) {
          stopAudio();
        }

        // 如果完成弹窗打开，先关闭
        if (showCompleteModal) {
          closeCompleteModal();
        }

        selectCategory(categoryId);
        console.log('已调用 selectCategory');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [getShortcutMap, selectCategory, isPlaying, stopAudio, showCompleteModal, closeCompleteModal]);
}

// 导出快捷键字符串供其他组件使用
export { SHORTCUT_KEYS };
