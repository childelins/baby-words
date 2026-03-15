import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function CategoryList() {
  const { categories, currentCategory, selectCategory, progress } = useGameStore();

  return (
    <div className="bg-white rounded-[30px] border-2 border-primary-200 p-5 shadow-sm">
      <h3 className="text-lg font-bold text-primary-600 mb-4">
        选择主题
      </h3>

      <div className="flex flex-col gap-4">
        {categories.map((category, index) => {
          const completedCount = category.words.filter((w) =>
            progress.completedWords.includes(w.id)
          ).length;
          const totalCount = category.words.length;
          const isActive = currentCategory?.id === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => selectCategory(category.id)}
              className={`w-full h-[70px] rounded-2xl flex items-center gap-3 px-4 transition-all ${
                isActive ? 'ring-2 ring-primary-400 ring-offset-2' : ''
              }`}
              style={{ backgroundColor: category.bgColor }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-3xl">{category.icon}</span>
              <div className="flex-1 text-left">
                <p className="font-bold text-base" style={{ color: category.color }}>
                  {category.name}
                </p>
                <p className="text-sm font-medium" style={{ color: category.color }}>
                  {completedCount}/{totalCount} 单词
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
