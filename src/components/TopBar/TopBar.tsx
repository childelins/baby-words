import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function TopBar() {
  const { progress } = useGameStore();

  return (
    <div className="w-full max-w-[1120px] mx-auto px-5">
      <div className="bg-white rounded-[30px] border-2 border-primary-200 px-6 py-3 flex items-center justify-between shadow-sm">
        {/* 星星数量 */}
        <div className="flex items-center gap-2">
          <motion.div
            className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center"
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.4, repeat: 0 }}
            key={progress.stars}
          >
            <span className="text-2xl">⭐</span>
          </motion.div>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={progress.stars}
              initial={{ y: 20, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="text-2xl font-extrabold text-primary-600"
            >
              {progress.stars}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* 标题 */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-primary-600">
            🌈 宝宝单词乐园 🌈
          </h1>
        </div>

        {/* 连续学习天数 */}
        <div className="flex items-center gap-2 bg-primary-100 rounded-full px-4 py-2">
          <span className="text-xl">🔥</span>
          <span className="text-sm font-semibold text-primary-600">
            连续学习 {progress.streak} 天
          </span>
        </div>
      </div>
    </div>
  );
}
