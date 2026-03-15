import { motion } from 'framer-motion';
import { TopBar } from '../components/TopBar';
import { CategoryList } from '../components/CategoryList';
import { ProgressBar } from '../components/ProgressBar';
import { Mascot } from '../components/Mascot';

export function HomePage() {
  return (
    <div className="min-h-screen bg-primary-50 flex flex-col">
      {/* 背景装饰 - 匹配设计稿位置 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[200px] w-[350px] h-[350px] bg-[#E0D4F7] rounded-full opacity-30" />
        <div className="absolute top-[630px] right-[70px] w-[400px] h-[400px] bg-[#FBD5E8] rounded-full opacity-30" />
        <div className="absolute top-[50px] right-[50px] w-[300px] h-[300px] bg-[#D4F7E0] rounded-full opacity-40" />
      </div>

      {/* 内容 */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 顶部栏 */}
        <div className="pt-5 pb-4">
          <TopBar />
        </div>

        {/* 主内容区 */}
        <div className="flex-1 flex items-center justify-center px-5">
          <div className="flex items-start gap-10">
            {/* 左侧吉祥物 */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Mascot />
            </motion.div>

            {/* 中间分类列表 */}
            <motion.div
              className="w-[280px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CategoryList />
            </motion.div>
          </div>
        </div>

        {/* 底部进度条 */}
        <div className="py-5">
          <ProgressBar />
        </div>
      </div>
    </div>
  );
}
