import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function NavButtons() {
  const { currentCategory, currentWordIndex, nextWord, prevWord, goToHome } = useGameStore();

  if (!currentCategory) return null;

  const isFirstWord = currentWordIndex === 0;
  const isLastWord = currentWordIndex === currentCategory.words.length - 1;

  return (
    <div className="flex items-center justify-center gap-3">
      {/* 上一个按钮 */}
      <motion.button
        onClick={prevWord}
        disabled={isFirstWord}
        className={`px-5 py-2.5 rounded-xl flex flex-col items-center gap-0.5 shadow-sm transition-colors ${
          isFirstWord
            ? 'bg-theme-bg-card opacity-50 cursor-not-allowed'
            : 'bg-theme-bg-card hover:bg-mascot-100'
        }`}
        whileHover={!isFirstWord ? { scale: 1.05 } : {}}
        whileTap={!isFirstWord ? { scale: 0.95 } : {}}
      >
        <span className="text-theme-text-secondary font-semibold text-sm">上一个</span>
        <span className="text-theme-text-muted text-xs">←</span>
      </motion.button>

      {/* 主页按钮 */}
      <motion.button
        onClick={goToHome}
        className="px-5 py-2.5 rounded-xl flex flex-col items-center gap-0.5 shadow-sm transition-colors bg-mascot-100 hover:bg-mascot-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-theme-text-secondary font-semibold text-sm">主页</span>
        <span className="text-theme-text-muted text-xs">Esc</span>
      </motion.button>

      {/* 下一个按钮 */}
      <motion.button
        onClick={nextWord}
        className={`px-5 py-2.5 rounded-xl flex flex-col items-center gap-0.5 shadow-sm transition-colors ${
          isLastWord
            ? 'bg-mascot-100 hover:bg-mascot-200'
            : 'bg-theme-bg-card hover:bg-mascot-100'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-theme-text-secondary font-semibold text-sm">
          {isLastWord ? '完成' : '下一个'}
        </span>
        <span className="text-theme-text-muted text-xs">→</span>
      </motion.button>
    </div>
  );
}
