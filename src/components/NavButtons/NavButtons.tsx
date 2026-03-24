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
        className={`w-[100px] h-[120px] rounded-3xl flex flex-col items-center justify-center gap-1 shadow-md transition-colors ${
          isFirstWord
            ? 'bg-theme-bg-card opacity-50 cursor-not-allowed'
            : 'bg-theme-bg-card hover:bg-mascot-100'
        }`}
        whileHover={!isFirstWord ? { scale: 1.05 } : {}}
        whileTap={!isFirstWord ? { scale: 0.95 } : {}}
      >
        <span className="text-4xl">⬅️</span>
        <span className="text-theme-text-secondary font-semibold text-sm">上一个</span>
        <span className="text-theme-text-muted font-medium text-xs">←</span>
      </motion.button>

      {/* 主页按钮 */}
      <motion.button
        onClick={goToHome}
        className="w-[120px] h-[120px] bg-mascot-600 rounded-3xl flex flex-col items-center justify-center gap-1 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-4xl">🏠</span>
        <span className="text-white font-semibold text-sm">主页</span>
        <span className="text-white/80 font-medium text-xs">Esc</span>
      </motion.button>

      {/* 下一个按钮 */}
      <motion.button
        onClick={nextWord}
        className={`w-[100px] h-[120px] rounded-3xl flex flex-col items-center justify-center gap-1 shadow-md ${
          isLastWord ? 'bg-mascot-500' : 'bg-success'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-4xl">{isLastWord ? '🎉' : '➡️'}</span>
        <span className="text-white font-semibold text-sm">
          {isLastWord ? '完成' : '下一个'}
        </span>
        <span className="text-white/80 font-medium text-xs">→</span>
      </motion.button>
    </div>
  );
}
