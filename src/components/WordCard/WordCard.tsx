import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

// 卡片内容依次出现动画变体
const cardContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// 声波动画组件
function SoundWave({ isActive, color }: { isActive: boolean; color: string }) {
  return (
    <div className="flex items-center gap-0.5 h-4">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`w-1 rounded-full ${color}`}
          animate={isActive ? {
            height: [8, 16, 8],
          } : { height: 8 }}
          transition={{
            duration: 0.4,
            repeat: isActive ? Infinity : 0,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
          style={{ height: 8 }}
        />
      ))}
    </div>
  );
}

export function WordCard() {
  const { currentCategory, currentWordIndex, isPlaying, playingLang, slideDirection } = useGameStore();

  if (!currentCategory) return null;

  const word = currentCategory.words[currentWordIndex];
  const totalWords = currentCategory.words.length;
  const currentNumber = currentWordIndex + 1;
  const progressPercentage = ((currentWordIndex + 1) / totalWords) * 100;

  // 播放状态
  const isPlayingEn = isPlaying && playingLang === 'en';
  const isPlayingZh = isPlaying && playingLang === 'zh';

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 进度条 */}
      <div className="w-[440px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-mascot-600 font-bold text-sm">
            {currentCategory.name}
          </span>
          <span className="text-mascot-600 font-bold text-sm">
            {currentNumber} / {totalWords}
          </span>
        </div>
        <div className="h-2 bg-mascot-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-mascot-500 rounded-full"
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
          initial={{
            opacity: 0,
            x: slideDirection === 'left' ? 100 : slideDirection === 'right' ? -100 : 0,
            y: slideDirection ? 0 : 50
          }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{
            opacity: 0,
            x: slideDirection === 'left' ? -100 : slideDirection === 'right' ? 100 : 0,
            y: 0
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-[440px] bg-theme-bg-container rounded-[40px] border-[3px] border-theme-border p-8 shadow-lg transition-colors"
        >
          <motion.div
            variants={cardContentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 图片区域 */}
            <motion.div
              variants={itemVariants}
              className="w-[320px] h-[260px] bg-mascot-50 rounded-[40px] border-[3px] border-mascot-200 mx-auto flex items-center justify-center relative overflow-hidden"
            >
              <motion.span
                className="text-[120px]"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', damping: 10 }}
              >
                {word.emoji}
              </motion.span>
              {/* 装饰 */}
              <span className="absolute top-2 right-3 text-2xl">✨</span>
              <span className="absolute bottom-3 left-2 text-xl">⭐</span>
              <span className="absolute top-4 left-4 text-lg">💫</span>
            </motion.div>

            {/* 单词显示 */}
            <motion.div variants={itemVariants} className="mt-6 text-center">
              <motion.h2
                variants={itemVariants}
                className="text-mascot-600 text-[56px] font-extrabold mb-2"
              >
                {word.english}
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-theme-text-secondary text-[28px] font-semibold mb-1"
              >
                {word.chinese}
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-theme-text-muted text-base"
              >
                {word.phonetic}
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* 播放指示器 */}
      <div className="flex items-center gap-3">
        <motion.div
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors ${
            isPlayingEn ? 'bg-mascot-600' : 'bg-mascot-100'
          }`}
          animate={isPlayingEn ? { scale: [1, 1.05, 1] } : {}}
          transition={{
            duration: 0.6,
            repeat: isPlayingEn ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          <SoundWave
            isActive={isPlayingEn}
            color={isPlayingEn ? 'bg-white' : 'bg-mascot-600'}
          />
          <span className={`text-sm font-semibold ${
            isPlayingEn ? 'text-white' : 'text-mascot-600'
          }`}>
            English
          </span>
        </motion.div>

        <span className="text-mascot-600 text-lg">→</span>

        <motion.div
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors ${
            isPlayingZh ? 'bg-mascot-600' : 'bg-mascot-100'
          }`}
          animate={isPlayingZh ? { scale: [1, 1.05, 1] } : {}}
          transition={{
            duration: 0.6,
            repeat: isPlayingZh ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          <SoundWave
            isActive={isPlayingZh}
            color={isPlayingZh ? 'bg-white' : 'bg-mascot-600'}
          />
          <span className={`text-sm font-semibold ${
            isPlayingZh ? 'text-white' : 'text-mascot-600'
          }`}>
            中文
          </span>
        </motion.div>
      </div>

      {/* Space 键提示 */}
      <div className="flex items-center gap-2">
        <div className="w-20 h-8 bg-theme-bg-card rounded-lg border border-theme-border flex items-center justify-center transition-colors">
          <span className="text-theme-text-secondary font-semibold text-xs">Space</span>
        </div>
        <span className="text-theme-text-muted font-medium text-sm">重复播放发音</span>
      </div>
    </div>
  );
}
