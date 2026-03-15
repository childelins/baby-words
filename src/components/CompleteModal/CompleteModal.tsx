import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function CompleteModal() {
  const { showCompleteModal, closeCompleteModal, goToHome, progress } = useGameStore();

  const handleGoHome = () => {
    closeCompleteModal();
    goToHome();
  };

  // 内容依次出现的动画配置
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {showCompleteModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleGoHome}
        >
          <motion.div
            className="bg-white rounded-[40px] p-10 max-w-sm text-center shadow-2xl"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 🎉 持续旋转+缩放动画 */}
            <motion.div
              className="text-6xl mb-4"
              animate={{
                rotate: [0, -15, 15, -15, 15, 0],
                scale: [1, 1.2, 1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            >
              🎉
            </motion.div>

            {/* 标题 - stagger delay 0.1s */}
            <motion.h2
              className="text-2xl font-bold text-primary-600 mb-2"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              太棒了！
            </motion.h2>

            {/* 描述 - stagger delay 0.2s */}
            <motion.p
              className="text-gray-500 mb-4"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              你已经学完了这个分类的所有单词！
            </motion.p>

            {/* 星星卡片 - stagger delay 0.3s */}
            <motion.div
              className="bg-primary-50 rounded-2xl p-4 mb-6"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2">
                {/* ⭐ 星星摇摆动画 */}
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  ⭐
                </motion.span>
                <span className="text-xl font-bold text-primary-600">
                  总共 {progress.stars} 颗星星
                </span>
              </div>
            </motion.div>

            {/* 按钮 - 从下方滑入 */}
            <motion.button
              onClick={handleGoHome}
              className="w-full bg-primary-600 text-white font-semibold py-4 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: 'spring', damping: 15 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              返回主页
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
