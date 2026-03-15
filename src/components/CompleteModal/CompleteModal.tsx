import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function CompleteModal() {
  const { showCompleteModal, closeCompleteModal, goToHome, progress } = useGameStore();

  const handleGoHome = () => {
    closeCompleteModal();
    goToHome();
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
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              🎉
            </motion.div>

            <h2 className="text-2xl font-bold text-primary-600 mb-2">
              太棒了！
            </h2>
            <p className="text-gray-500 mb-4">
              你已经学完了这个分类的所有单词！
            </p>

            <div className="bg-primary-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="text-xl font-bold text-primary-600">
                  总共 {progress.stars} 颗星星
                </span>
              </div>
            </div>

            <motion.button
              onClick={handleGoHome}
              className="w-full bg-primary-600 text-white font-semibold py-4 rounded-2xl"
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
