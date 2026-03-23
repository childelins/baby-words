import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function ProgressBar() {
  const { progress } = useGameStore();
  const { completed, total } = progress.dailyProgress;
  const percentage = Math.min((completed / total) * 100, 100);
  const isComplete = completed >= total;

  return (
    <div className="w-full max-w-[1120px] mx-auto px-5">
      <div className="bg-theme-bg-container rounded-2xl border-2 border-theme-border px-4 py-3 flex items-center gap-4 shadow-sm transition-colors">
        <span className="text-mascot-600 font-semibold text-sm whitespace-nowrap">
          今日进度
        </span>

        <div className="flex-1 h-3 bg-mascot-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <span className={`font-bold text-sm whitespace-nowrap ${
          isComplete ? 'text-success' : 'text-mascot-600'
        }`}>
          {completed}/{total} 单词
        </span>

        {isComplete && (
          <motion.span
            className="text-2xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            🏆
          </motion.span>
        )}
      </div>
    </div>
  );
}
