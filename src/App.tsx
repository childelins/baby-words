function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600">
            宝宝单词乐园
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            面向 2-4 岁幼儿的单词学习应用
          </p>
        </header>
        <main className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
            <p className="text-center text-gray-500">
              项目初始化成功!
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
