import { useGameStore } from '../../store/useGameStore';

export function TopBar() {
  const { progress } = useGameStore();

  return (
    <div className="w-full max-w-[1120px] mx-auto px-5">
      <div className="bg-white rounded-[30px] border-2 border-primary-200 px-6 py-3 flex items-center justify-between shadow-sm">
        {/* 星星数量 */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-2xl">⭐</span>
          </div>
          <span className="text-2xl font-extrabold text-primary-600">
            {progress.stars}
          </span>
        </div>

        {/* 标题 */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-primary-600">
            🌈 宝宝单词乐园 🌈
          </h1>
        </div>

        {/* 连续学习天数 */}
        <div className="flex items-center gap-2 bg-primary-100 rounded-full px-4 py-2">
          <span className="text-xl">🔥</span>
          <span className="text-sm font-semibold text-primary-600">
            连续学习 {progress.streak} 天
          </span>
        </div>
      </div>
    </div>
  );
}
