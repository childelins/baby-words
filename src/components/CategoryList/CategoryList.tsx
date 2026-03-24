import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { useRipple } from '../../hooks';
import { SHORTCUT_KEYS } from '../../hooks/useKeyboardShortcuts';

export function CategoryList() {
  const { categories, currentCategory, selectCategory, progress } = useGameStore();
  const { createRipple, getRipples } = useRipple();

  // 计算单个分类的进度
  const getCategoryProgress = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return { completed: 0, total: 0, percentage: 0 };

    const completed = category.words.filter(
      word => progress.completedWords.includes(word.id)
    ).length;
    const total = category.words.length;
    const percentage = total > 0 ? Math.min((completed / total) * 100, 100) : 0;

    return { completed, total, percentage };
  };

  return (
    <div className="bg-theme-bg-container rounded-[30px] border-2 border-theme-border p-4 shadow-sm transition-colors">
      <h3 className="text-base font-bold text-mascot-600 mb-3 text-center">
        选择主题 🎨
      </h3>

      {/* 4×3 网格布局 */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map((category, index) => {
          const isActive = currentCategory?.id === category.id;
          const { completed, total, percentage } = getCategoryProgress(category.id);
          const shortcutKey = index < SHORTCUT_KEYS.length ? SHORTCUT_KEYS[index] : null;

          return (
            <motion.button
              key={category.id}
              onClick={(e) => {
                createRipple(e, category.id);
                selectCategory(category.id);
              }}
              className={`w-full h-[70px] rounded-2xl flex flex-col items-center justify-center gap-1 transition-all relative overflow-hidden ${
                isActive ? 'ring-2 ring-primary-400 ring-offset-2' : ''
              }`}
              style={{ backgroundColor: category.bgColor }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* 涟漪效果 */}
              {getRipples(category.id).map((ripple) => (
                <motion.span
                  key={ripple.id}
                  className="absolute rounded-full bg-white/40 pointer-events-none"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ width: 0, height: 0, opacity: 1 }}
                  animate={{ width: 200, height: 200, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              ))}

              {/* 快捷键角标 - 右上角 */}
              {shortcutKey && (
                <span className="absolute top-1 right-1 text-[10px] font-bold text-white bg-black/40 px-1.5 py-0.5 rounded">
                  {shortcutKey}
                </span>
              )}

              <span className="text-2xl">{category.icon}</span>
              <p className="font-bold text-[11px]" style={{ color: category.color }}>
                {category.name}
              </p>

              {/* 进度条 - 只有有进度时才显示 */}
              {percentage > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: category.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
              )}

              {/* 进度数字（完成时显示星星） - 左上角 */}
              {completed === total && total > 0 && (
                <span className="absolute top-1 left-1 text-xs">⭐</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
