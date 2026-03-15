import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

const messages = [
  '加油学习哦~',
  '你真棒！',
  '继续加油！',
  '太厉害了！',
  '你最棒！',
];

export function Mascot() {
  const { isPlaying, playingLang, progress } = useGameStore();

  const getMessage = () => {
    if (isPlaying) {
      return playingLang === 'en' ? '正在播放英文~' : '正在播放中文~';
    }
    if (progress.dailyProgress.completed >= progress.dailyProgress.total) {
      return '今日目标完成！🎉';
    }
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 吉祥物身体 */}
      <motion.div
        className="w-40 h-40 bg-primary-600 rounded-full flex items-center justify-center shadow-lg"
        animate={{
          rotate: isPlaying ? [0, -5, 5, -5, 5, 0] : 0,
        }}
        transition={{
          duration: 0.5,
          repeat: isPlaying ? Infinity : 0,
        }}
      >
        <span className="text-8xl">😺</span>
      </motion.div>

      {/* 对话气泡 */}
      <div className="bg-white rounded-2xl border-2 border-primary-200 px-4 py-3 shadow-sm max-w-[180px]">
        <p className="text-primary-600 font-semibold text-center text-base">
          {getMessage()}
        </p>
      </div>

      {/* 名字 */}
      <span className="text-primary-600 font-bold text-sm">小紫猫</span>
    </div>
  );
}
