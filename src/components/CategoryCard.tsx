import { Category } from '@/types'

interface CategoryCardProps {
  category: Category
  index: number
  onClick: () => void
}

export function CategoryCard({ category, index, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-gradient-to-br ${category.gradient}
        rounded-2xl sm:rounded-3xl p-3 sm:p-4
        flex flex-col items-center gap-1 sm:gap-2
        shadow-soft
        transition-all duration-300 ease-out
        hover:scale-105 hover:-rotate-1 hover:shadow-card
        active:scale-95
        min-h-[100px] sm:min-h-[120px]
      `}
    >
      {/* 序号 */}
      <span className="absolute top-2 left-2 w-6 h-6 sm:w-7 sm:h-7 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-sm sm:text-base font-bold text-white shadow-sm">
        {index + 1}
      </span>

      <span className="text-3xl sm:text-4xl animate-bounce-slow">{category.emoji}</span>
      <span className="text-sm sm:text-lg font-bold text-white drop-shadow-md text-center leading-tight">
        {category.title}
      </span>

      {/* 装饰光晕 */}
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/20 rounded-full blur-xl" />
      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 rounded-full blur-lg" />
    </button>
  )
}
