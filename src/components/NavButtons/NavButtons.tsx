import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function NavButtons() {
  const { currentCategory, currentWordIndex, nextWord, prevWord, goToHome } = useGameStore();

  if (!currentCategory) return null;

  const isFirstWord = currentWordIndex === 0;
  const isLastWord = currentWordIndex === currentCategory.words.length - 1;

  return (
    <div className="flex items-center justify-center gap-6">
      {/* 上一个按钮 */}
      <motion.button
        onClick={prevWord}
        disabled={isFirstWord}
        className={`w-[100px] h-[100px] rounded-3xl flex flex-col items-center justify-center gap-1 shadow-md ${
          isFirstWord
            ? 'bg-gray-100 opacity-50 cursor-not-allowed'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
        whileHover={!isFirstWord ? { scale: 1.05 } : {}}
        whileTap={!isFirstWord ? { scale: 0.95 } : {}}
      >
        <span className="text-4xl">⬅️</span>
        <span className="text-gray-500 font-semibold text-sm">上一个</span>
      </motion.button>

      {/* 主页按钮 */}
      <motion.button
        onClick={goToHome}
        className="w-[120px] h-[100px] bg-primary-600 rounded-3xl flex flex-col items-center justify-center gap-1 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-4xl">🏠</span>
        <span className="text-white font-semibold text-sm">主页</span>
      </motion.button>

      {/* 下一个按钮 */}
      <motion.button
        onClick={nextWord}
        className={`w-[100px] h-[100px] rounded-3xl flex flex-col items-center justify-center gap-1 shadow-md ${
          isLastWord ? 'bg-pink-500' : 'bg-success'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-4xl">{isLastWord ? '🎉' : '➡️'}</span>
        <span className="text-white font-semibold text-sm">
          {isLastWord ? '完成' : '下一个'}
        </span>
      </motion.button>
    </div>
  );
}
