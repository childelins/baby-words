import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function WordCard() {
  const { currentCategory, currentWordIndex, isPlaying, playingLang } = useGameStore();

  if (!currentCategory) return null;

  const word = currentCategory.words[currentWordIndex];
  const totalWords = currentCategory.words.length;
  const currentNumber = currentWordIndex + 1;
  const progressPercentage = ((currentWordIndex + 1) / totalWords) * 100;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 进度条 */}
      <div className="w-[440px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-primary-600 font-bold text-sm">
            {currentCategory.name}
          </span>
          <span className="text-primary-600 font-bold text-sm">
            {currentNumber} / {totalWords}
          </span>
        </div>
        <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* 主卡片 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={word.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-[440px] bg-white rounded-[40px] border-[3px] border-primary-200 p-8 shadow-lg"
        >
          {/* 图片区域 */}
          <div className="w-[320px] h-[260px] bg-primary-50 rounded-[40px] border-[3px] border-primary-200 mx-auto flex items-center justify-center relative overflow-hidden">
            <span className="text-[120px]">{word.emoji}</span>
            {/* 装饰 */}
            <span className="absolute top-2 right-3 text-2xl">✨</span>
            <span className="absolute bottom-3 left-2 text-xl">⭐</span>
            <span className="absolute top-4 left-4 text-lg">💫</span>
          </div>

          {/* 单词显示 */}
          <div className="mt-6 text-center">
            <h2 className="text-primary-600 text-[56px] font-extrabold mb-2">
              {word.english}
            </h2>
            <p className="text-gray-500 text-[28px] font-semibold mb-1">
              {word.chinese}
            </p>
            <p className="text-gray-400 text-base">
              {word.phonetic}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 播放指示器 */}
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors ${
            isPlaying && playingLang === 'en'
              ? 'bg-primary-600'
              : 'bg-primary-100'
          }`}
        >
          <span className="text-lg">🔊</span>
          <span className={`text-sm font-semibold ${
            isPlaying && playingLang === 'en' ? 'text-white' : 'text-primary-600'
          }`}>
            English
          </span>
        </div>

        <span className="text-primary-600 text-lg">→</span>

        <div
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors ${
            isPlaying && playingLang === 'zh'
              ? 'bg-pink-500'
              : 'bg-pink-100'
          }`}
        >
          <span className="text-lg">🔊</span>
          <span className={`text-sm font-semibold ${
            isPlaying && playingLang === 'zh' ? 'text-white' : 'text-pink-600'
          }`}>
            中文
          </span>
        </div>
      </div>

      {/* Space 键提示 */}
      <div className="flex items-center gap-2">
        <div className="w-20 h-8 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center">
          <span className="text-gray-600 font-semibold text-xs">Space</span>
        </div>
        <span className="text-gray-400 font-medium text-sm">重复播放发音</span>
      </div>
    </div>
  );
}
