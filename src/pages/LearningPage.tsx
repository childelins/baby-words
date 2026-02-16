import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { WordCard, Navigation, Settings } from '@/components'
import { categories } from '@/data/words'
import { useSpeech, useSwipe } from '@/hooks'

// 背景装饰
const decorations = ['🌟', '🎈', '🌈', '🦋']

export function LearningPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()

  const category = categories.find(c => c.id === categoryId)
  const [currentIndex, setCurrentIndex] = useState(0)

  const { speakWord, currentProfile, selectVoice } = useSpeech()

  // 获取当前单词
  const currentWord = category?.words[currentIndex]

  // 播放发音
  const handleSpeak = useCallback(() => {
    if (currentWord) {
      speakWord(currentWord.en, currentWord.cn)
    }
  }, [currentWord, speakWord])

  // 上一张
  const handlePrev = useCallback(() => {
    if (category) {
      setCurrentIndex(prev => (prev - 1 + category.words.length) % category.words.length)
    }
  }, [category])

  // 下一张
  const handleNext = useCallback(() => {
    if (category) {
      setCurrentIndex(prev => (prev + 1) % category.words.length)
    }
  }, [category])

  // 返回首页
  const handleHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  // 滑动手势
  const swipeHandlers = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev
  })

  // 键盘支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          handlePrev()
          break
        case 'ArrowRight':
          handleNext()
          break
        case ' ':
          e.preventDefault()
          handleSpeak()
          break
        case 'Escape':
          handleHome()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext, handleSpeak, handleHome])

  // 页面加载时自动播放
  useEffect(() => {
    const timer = setTimeout(handleSpeak, 300)
    return () => clearTimeout(timer)
  }, [currentIndex])

  // 切换卡片时重置索引
  useEffect(() => {
    setCurrentIndex(0)
  }, [categoryId])

  // 如果分类不存在，返回首页
  if (!category) {
    navigate('/')
    return null
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden"
      {...swipeHandlers}
    >
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
            top: ['10%', '20%', '70%', '80%'][i],
            left: ['5%', 'auto', '8%', 'auto'][i],
            right: ['auto', '10%', 'auto', '5%'][i],
            animationDelay: `${i * 0.5}s`
          }}
        >
          {emoji}
        </span>
      ))}

      {/* 分类标题 */}
      <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-6 drop-shadow-md animate-bounce-slow">
        {category.emoji} {category.title}
      </h2>

      {/* 单词卡片 */}
      {currentWord && (
        <WordCard
          word={currentWord}
          onSpeak={handleSpeak}
        />
      )}

      {/* 导航 */}
      <Navigation
        onHome={handleHome}
        onPrev={handlePrev}
        onNext={handleNext}
        current={currentIndex + 1}
        total={category.words.length}
      />
    </div>
  )
}
