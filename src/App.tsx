import { Routes, Route } from 'react-router-dom'
import { HomePage, LearningPage } from '@/pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/learn/:categoryId" element={<LearningPage />} />
    </Routes>
  )
}

export default App
