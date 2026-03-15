import type { PlayLang } from '../types';

export function speak(text: string, lang: PlayLang): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      resolve();
      return;
    }

    // 取消之前的播放
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-US' : 'zh-CN';
    utterance.rate = 0.8;
    utterance.pitch = 1.1;

    utterance.onend = () => resolve();
    utterance.onerror = (event) => {
      console.error('Speech error:', event);
      resolve(); // 即使出错也 resolve，不阻塞流程
    };

    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
