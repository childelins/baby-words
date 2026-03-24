import { useGameStore } from './store/useGameStore';
import { useKeyboardShortcuts } from './hooks';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';

function App() {
  const { currentCategory } = useGameStore();

  // 全局键盘快捷键
  useKeyboardShortcuts();

  return (
    <>
      {currentCategory ? <GamePage /> : <HomePage />}
    </>
  );
}

export default App;
