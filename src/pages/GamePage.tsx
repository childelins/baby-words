import { motion } from 'framer-motion';
import { TopBar } from '../components/TopBar';
import { WordCard } from '../components/WordCard';
import { Mascot } from '../components/Mascot';
import { CategoryList } from '../components/CategoryList';
import { ProgressBar } from '../components/ProgressBar';
import { NavButtons } from '../components/NavButtons';
import { CompleteModal } from '../components/CompleteModal';
import { useGameStore } from '../store/useGameStore';
import { useAutoPlay } from '../hooks/useAutoPlay';

export function GamePage() {
  const { currentCategory } = useGameStore();

  // 自动播放 hook
  useAutoPlay();

  if (!currentCategory) return null;

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-primary-100 rounded-full opacity-30" />
        <div className="absolute top-[600px] right-0 w-[300px] h-[300px] bg-pink-100 rounded-full opacity-30" />
        <div className="absolute top-20 right-10 w-[200px] h-[200px] bg-green-100 rounded-full opacity-40" />
      </div>

      {/* 内容 */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 顶部栏 */}
        <div className="pt-5 pb-4">
          <TopBar />
        </div>

        {/* 主内容区 */}
        <div className="flex-1 flex items-start justify-center px-5 py-4 gap-6">
          {/* 左侧吉祥物 */}
          <motion.div
            className="hidden xl:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Mascot />
          </motion.div>

          {/* 中间游戏卡片区 */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <WordCard />
            <NavButtons />
          </motion.div>

          {/* 右侧分类栏 */}
          <motion.div
            className="hidden lg:block w-[260px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <CategoryList />
          </motion.div>
        </div>

        {/* 底部进度条 */}
        <div className="py-5">
          <ProgressBar />
        </div>
      </div>

      {/* 完成弹窗 */}
      <CompleteModal />
    </div>
  );
}
