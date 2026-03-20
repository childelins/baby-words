import { motion, AnimatePresence, type TargetAndTransition, type Transition } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { useMascotTheme } from '../../hooks/useMascotTheme';
import { mascots, stateEmojis, getRandomMessage } from './mascotConfig';
import type { MascotState } from '../../types';

// 表情切换动画变体
const emojiVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

// 状态动画配置
const stateAnimations: Record<MascotState, TargetAndTransition> = {
  idle: {
    scale: [1, 1.02, 1],
    y: [0, -2, 0],
  },
  learning: {
    rotate: [0, -5, 5, -5, 5, 0],
  },
  happy: {
    scale: [1, 1.1, 1],
  },
  celebrate: {
    scale: [1, 1.15, 1.1, 1.15, 1],
    rotate: [0, -10, 10, -10, 10, 0],
  },
};

// 状态动画过渡配置
const stateTransitions: Record<MascotState, Transition> = {
  idle: {
    duration: 2.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
  learning: {
    duration: 0.5,
    repeat: Infinity,
  },
  happy: {
    duration: 0.3,
    repeat: 0,
  },
  celebrate: {
    duration: 0.8,
    repeat: Infinity,
  },
};

export function Mascot() {
  const { mascotState, isPlaying, playingLang, progress } = useGameStore();
  const { mascot } = useMascotTheme();

  const config = mascots[mascot];
  const emoji = stateEmojis[mascotState][mascot];

  // 获取对话消息
  const getMessage = (): string => {
    if (mascotState === 'learning' && isPlaying) {
      return playingLang === 'en' ? '正在播放英文~' : '正在播放中文~';
    }
    if (mascotState === 'celebrate') {
      return '全部学完啦！🎉';
    }
    if (progress.dailyProgress.completed >= progress.dailyProgress.total) {
      return '今日目标完成！🎉';
    }
    return getRandomMessage(mascotState);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 吉祥物身体 */}
      <motion.div
        className="w-40 h-40 bg-mascot-600 rounded-full flex items-center justify-center shadow-lg"
        animate={stateAnimations[mascotState]}
        transition={stateTransitions[mascotState]}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`${mascot}-${mascotState}`}
            className="text-8xl"
            variants={emojiVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            {emoji}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* 对话气泡 */}
      <motion.div
        className="bg-white rounded-2xl border-2 border-mascot-200 px-4 py-3 shadow-sm max-w-[180px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={getMessage()}
      >
        <p className="text-mascot-600 font-semibold text-center text-base">
          {getMessage()}
        </p>
      </motion.div>

      {/* 名字 */}
      <span className="text-mascot-600 font-bold text-sm">{config.name}</span>
    </div>
  );
}
