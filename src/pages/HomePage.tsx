import { useNavigate } from 'react-router-dom'
import { CategoryCard, Settings } from '@/components'
import { categories } from '@/data/words'
import { useSpeech } from '@/hooks'

// 背景装饰
const decorations = ['🌟', '🎈', '🌈', '🦋']

export function HomePage() {
  const navigate = useNavigate()
  const { currentProfile, selectVoice } = useSpeech()

  const handleSelectCategory = (categoryId: string) => {
    navigate(`/learn/${categoryId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex flex-col items-center p-4 sm:p-6 relative overflow-y-auto">
      {/* 设置 */}
      <Settings
        currentVoice={currentProfile}
        onSelectVoice={selectVoice}
      />

      {/* 背景装饰 */}
      {decorations.map((emoji, i) => (
        <span
          key={i}
          className="absolute text-4xl sm:text-6xl opacity-10 animate-float pointer-events-none"
          style={{
            top: ['5%', '15%', '75%', '85%'][i],
            left: ['5%', 'auto', '8%', 'auto'][i],
            right: ['auto', '10%', 'auto', '5%'][i],
            animationDelay: `${i * 0.5}s`
          }}
        >
          {emoji}
        </span>
      ))}

      {/* 标题 */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600 mt-6 mb-6 sm:mb-8 text-center animate-bounce-slow drop-shadow-lg shrink-0">
        宝宝学单词
      </h1>

      {/* 分类卡片 */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl pb-6">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
            onClick={() => handleSelectCategory(category.id)}
          />
        ))}
      </div>
    </div>
  )
}
