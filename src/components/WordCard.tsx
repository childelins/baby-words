import { useState, useEffect } from 'react'
import { Word } from '@/types'

interface WordCardProps {
  word: Word
  onSpeak: () => void
}

const starEmojis = ['⭐', '✨', '🌟', '💫', '🎉', '🎊']

export function WordCard({ word, onSpeak }: WordCardProps) {
  const [stars, setStars] = useState<{ id: number; emoji: string; left: number; top: number; delay: number }[]>([])
  const [animateWiggle, setAnimateWiggle] = useState(true)

  // 触发星星特效
  useEffect(() => {
    const newStars = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      emoji: starEmojis[Math.floor(Math.random() * starEmojis.length)],
      left: Math.random() * 80 + 10,
      top: Math.random() * 80 + 10,
      delay: Math.random() * 0.3
    }))
    setStars(newStars)

    // 清理星星
    const timer = setTimeout(() => setStars([]), 1000)
    return () => clearTimeout(timer)
  }, [word])

  // 重置动画
  useEffect(() => {
    setAnimateWiggle(false)
    const timer = setTimeout(() => setAnimateWiggle(true), 10)
    return () => clearTimeout(timer)
  }, [word])

  return (
    <div
      onClick={onSpeak}
      className="
        relative w-full aspect-square max-w-[360px] sm:max-w-[400px]
        bg-white rounded-4xl
        flex flex-col items-center justify-center
        shadow-card
        cursor-pointer
        transition-transform duration-300
        hover:scale-[1.02]
        active:scale-[0.98]
        overflow-hidden
      "
    >
      {/* 星星特效 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map(star => (
          <span
            key={star.id}
            className="absolute text-2xl animate-star-fly"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`
            }}
          >
            {star.emoji}
          </span>
        ))}
      </div>

      {/* Emoji */}
      <span
        className={`text-7xl sm:text-8xl ${animateWiggle ? 'animate-wiggle' : ''}`}
      >
        {word.emoji}
      </span>

      {/* 中文 */}
      <span className="text-3xl sm:text-4xl text-gray-800 mt-3 font-bold">
        {word.cn}
      </span>

      {/* 英文 */}
      <span className="text-xl sm:text-2xl text-gray-500 mt-1">
        {word.en}
      </span>

      {/* 发音按钮 */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onSpeak()
        }}
        className="
          absolute bottom-4 right-4
          w-14 h-14 rounded-full
          bg-gradient-to-br from-blue-400 to-blue-500
          text-white text-2xl
          flex items-center justify-center
          shadow-button
          transition-all duration-300
          hover:scale-110 hover:shadow-lg
          active:scale-95
        "
      >
        🔊
      </button>

      {/* 装饰 */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl" />
    </div>
  )
}
