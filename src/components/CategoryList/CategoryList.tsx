import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function CategoryList() {
  const { categories, currentCategory, selectCategory } = useGameStore();

  return (
    <div className="bg-white rounded-[30px] border-2 border-primary-200 p-4 shadow-sm">
      <h3 className="text-base font-bold text-primary-600 mb-3 text-center">
        选择主题 🎨
      </h3>

      {/* 5行×2列网格布局 */}
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category, index) => {
          const isActive = currentCategory?.id === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => selectCategory(category.id)}
              className={`w-full h-[70px] rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                isActive ? 'ring-2 ring-primary-400 ring-offset-2' : ''
              }`}
              style={{ backgroundColor: category.bgColor }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-2xl">{category.icon}</span>
              <p className="font-bold text-[11px]" style={{ color: category.color }}>
                {category.name}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
