import { useState, useEffect } from 'react'
import { VoiceProfile } from '@/types'
import { voiceProfiles } from '@/data/voices'

interface SettingsProps {
  currentVoice: VoiceProfile
  onSelectVoice: (id: string) => void
}

export function Settings({ currentVoice, onSelectVoice }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false)

  // 关闭弹窗时停止语音
  useEffect(() => {
    if (!isOpen) {
      window.speechSynthesis?.cancel()
    }
  }, [isOpen])

  return (
    <>
      {/* 设置按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed top-4 right-4
          w-12 h-12 sm:w-14 sm:h-14 rounded-full
          bg-white/20 backdrop-blur-sm
          text-xl sm:text-2xl
          flex items-center justify-center
          transition-all duration-300
          hover:bg-white/40 hover:rotate-90
          z-50
        "
      >
        ⚙️
      </button>

      {/* 弹窗 */}
      {isOpen && (
        <div
          className="
            fixed inset-0
            bg-black/60 backdrop-blur-sm
            flex items-center justify-center
            z-50 p-4
          "
          onClick={() => setIsOpen(false)}
        >
          <div
            className="
              bg-white rounded-4xl
              p-6 sm:p-8
              w-full max-w-md
              max-h-[80vh] overflow-y-auto
              animate-slide-in
            "
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              🎙️ 选择声音
            </h2>

            <div className="space-y-3">
              {voiceProfiles.map(profile => (
                <button
                  key={profile.id}
                  onClick={() => onSelectVoice(profile.id)}
                  className={`
                    w-full flex items-center gap-4
                    p-4 rounded-2xl
                    transition-all duration-300
                    ${currentVoice.id === profile.id
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-400'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }
                  `}
                >
                  <span className="text-3xl">{profile.emoji}</span>
                  <div className="text-left">
                    <div className="font-bold text-gray-800">{profile.name}</div>
                    <div className="text-sm text-gray-500">{profile.desc}</div>
                  </div>
                  {currentVoice.id === profile.id && (
                    <span className="ml-auto text-2xl">✓</span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="
                w-full mt-6 py-4
                bg-gradient-to-r from-purple-500 to-pink-500
                text-white text-lg font-bold
                rounded-2xl
                transition-all duration-300
                hover:opacity-90
                active:scale-[0.98]
              "
            >
              完成
            </button>
          </div>
        </div>
      )}
    </>
  )
}
