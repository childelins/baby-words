import { useGameStore } from './store/useGameStore';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';

function App() {
  const { currentCategory } = useGameStore();

  return (
    <>
      {currentCategory ? <GamePage /> : <HomePage />}
    </>
  );
}

export default App;
