import { motion } from 'framer-motion';
import { useMascotTheme } from '../../hooks/useMascotTheme';
import { mascots, mascotIds } from './mascotConfig';

export function MascotSelector() {
  const { mascot, setMascot } = useMascotTheme();

  return (
    <div className="w-full max-w-[1120px] mx-auto px-5 mb-4">
      <div className="bg-theme-bg-container/80 backdrop-blur-sm rounded-2xl border border-theme-border px-4 py-3 transition-colors">
        <p className="text-center text-theme-text-secondary text-sm mb-3">选择你的小伙伴</p>
        <div className="flex justify-center gap-4">
          {mascotIds.map((id) => {
            const config = mascots[id];
            const isSelected = mascot === id;

            return (
              <motion.button
                key={id}
                onClick={() => setMascot(id)}
                className={`relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-mascot-50 ring-2 ring-mascot-600'
                    : 'bg-theme-bg-card hover:bg-theme-border'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-3xl">{config.emoji}</span>
                <span className={`text-xs font-medium ${
                  isSelected ? 'text-mascot-600' : 'text-theme-text-secondary'
                }`}>
                  {config.name}
                </span>
                {isSelected && (
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-mascot-600 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
