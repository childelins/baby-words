# 键盘快捷键选择主题 - 实现计划

> **For agentic workers:** REQUIRED SKILL: Use planning-with-files to implement this plan task-by-task.

**Goal:** 为分类选择添加键盘快捷键支持，让宝宝可以通过数字键和字母键快速选择主题。

**Architecture:** 创建独立的 `useKeyboardShortcuts` hook 在 App 级别监听键盘事件，在 `CategoryList` 组件显示快捷键角标。

**Tech Stack:** React, TypeScript, Zustand, TailwindCSS

---

## 文件结构

| 文件 | 操作 | 职责 |
|------|------|------|
| `src/hooks/useKeyboardShortcuts.ts` | 新建 | 快捷键监听 hook |
| `src/hooks/index.ts` | 修改 | 导出新 hook |
| `src/App.tsx` | 修改 | 引入 hook |
| `src/components/CategoryList/CategoryList.tsx` | 修改 | 显示快捷键角标 |

---

### Task 1: 创建 useKeyboardShortcuts Hook

**Files:**
- Create: `src/hooks/useKeyboardShortcuts.ts`

- [ ] **Step 1: 创建 hook 文件**

```typescript
import { useEffect, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';

// 快捷键映射字符串：数字 1-0 + 字母 Q-M（按键盘顺序）
const SHORTCUT_KEYS = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';

export function useKeyboardShortcuts() {
  const {
    categories,
    selectCategory,
    isPlaying,
    stopAudio,
    showCompleteModal,
    closeCompleteModal,
  } = useGameStore();

  // 生成快捷键到分类 ID 的映射
  const getShortcutMap = useCallback(() => {
    const map: Record<string, string> = {};
    categories.forEach((cat, index) => {
      if (index < SHORTCUT_KEYS.length) {
        map[SHORTCUT_KEYS[index]] = cat.id;
      }
    });
    return map;
  }, [categories]);

  useEffect(() => {
    const shortcutMap = getShortcutMap();

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      // 检查是否是快捷键
      const categoryId = shortcutMap[key];
      if (categoryId) {
        e.preventDefault();

        // 如果正在播放音频，先停止
        if (isPlaying) {
          stopAudio();
        }

        // 如果完成弹窗打开，先关闭
        if (showCompleteModal) {
          closeCompleteModal();
        }

        selectCategory(categoryId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [getShortcutMap, selectCategory, isPlaying, stopAudio, showCompleteModal, closeCompleteModal]);
}

// 导出快捷键字符串供其他组件使用
export { SHORTCUT_KEYS };
```

- [ ] **Step 2: 验证文件创建**

确认文件存在于 `src/hooks/useKeyboardShortcuts.ts`

---

### Task 2: 导出 Hook

**Files:**
- Modify: `src/hooks/index.ts`

- [ ] **Step 1: 添加导出**

在 `src/hooks/index.ts` 添加一行：

```typescript
export { useKeyboardShortcuts, SHORTCUT_KEYS } from './useKeyboardShortcuts';
```

完整文件内容：

```typescript
export { useAutoPlay } from './useAutoPlay';
export { useRipple } from './useRipple';
export { useMascotTheme } from './useMascotTheme';
export { useKeyboardShortcuts, SHORTCUT_KEYS } from './useKeyboardShortcuts';
```

---

### Task 3: 在 App 中使用 Hook

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: 引入并使用 hook**

```typescript
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
```

---

### Task 4: 在 CategoryList 显示快捷键角标

**Files:**
- Modify: `src/components/CategoryList/CategoryList.tsx`

- [ ] **Step 1: 添加快捷键角标**

在 `CategoryList` 组件中：

1. 导入 `SHORTCUT_KEYS`
2. 为每个按钮添加快捷键角标

修改后的文件：

```typescript
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { useRipple } from '../../hooks';
import { SHORTCUT_KEYS } from '../../hooks/useKeyboardShortcuts';

export function CategoryList() {
  const { categories, currentCategory, selectCategory, progress } = useGameStore();
  const { createRipple, getRipples } = useRipple();

  // 计算单个分类的进度
  const getCategoryProgress = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return { completed: 0, total: 0, percentage: 0 };

    const completed = category.words.filter(
      word => progress.completedWords.includes(word.id)
    ).length;
    const total = category.words.length;
    const percentage = total > 0 ? Math.min((completed / total) * 100, 100) : 0;

    return { completed, total, percentage };
  };

  return (
    <div className="bg-theme-bg-container rounded-[30px] border-2 border-theme-border p-4 shadow-sm transition-colors">
      <h3 className="text-base font-bold text-mascot-600 mb-3 text-center">
        选择主题 🎨
      </h3>

      {/* 4×3 网格布局 */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map((category, index) => {
          const isActive = currentCategory?.id === category.id;
          const { completed, total, percentage } = getCategoryProgress(category.id);
          const shortcutKey = index < SHORTCUT_KEYS.length ? SHORTCUT_KEYS[index] : null;

          return (
            <motion.button
              key={category.id}
              onClick={(e) => {
                createRipple(e, category.id);
                selectCategory(category.id);
              }}
              className={`w-full h-[70px] rounded-2xl flex flex-col items-center justify-center gap-1 transition-all relative overflow-hidden ${
                isActive ? 'ring-2 ring-primary-400 ring-offset-2' : ''
              }`}
              style={{ backgroundColor: category.bgColor }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* 涟漪效果 */}
              {getRipples(category.id).map((ripple) => (
                <motion.span
                  key={ripple.id}
                  className="absolute rounded-full bg-white/40 pointer-events-none"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ width: 0, height: 0, opacity: 1 }}
                  animate={{ width: 200, height: 200, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              ))}

              {/* 快捷键角标 */}
              {shortcutKey && (
                <span className="absolute top-1 right-1 text-[10px] font-bold text-white bg-black/40 px-1.5 py-0.5 rounded">
                  {shortcutKey}
                </span>
              )}

              <span className="text-2xl">{category.icon}</span>
              <p className="font-bold text-[11px]" style={{ color: category.color }}>
                {category.name}
              </p>

              {/* 进度条 - 只有有进度时才显示 */}
              {percentage > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: category.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
              )}

              {/* 进度数字（完成时显示星星） */}
              {completed === total && total > 0 && (
                <span className="absolute top-1 left-1 text-xs">⭐</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
```

**注意：** 快捷键角标和星星角标分别在右上角和左上角，不会重叠。

---

### Task 5: 验证功能

- [ ] **Step 1: 启动开发服务器**

```bash
npm run dev
```

- [ ] **Step 2: 手动测试清单**

1. 首页测试：
   - [ ] 按数字键 1 选择第一个分类
   - [ ] 按数字键 0 选择第 10 个分类
   - [ ] 按字母键 Q 选择第 11 个分类（如有）
   - [ ] 按未分配的键无反应

2. 游戏页测试：
   - [ ] 按其他分类的快捷键可切换
   - [ ] Space 仍可播放音频
   - [ ] ArrowLeft/Right 仍可导航
   - [ ] Escape 仍可返回主页

3. 边界情况：
   - [ ] 播放中按快捷键，音频停止后切换
   - [ ] 完成弹窗打开时按快捷键，弹窗关闭并切换

4. 视觉检查：
   - [ ] 快捷键角标显示在右上角
   - [ ] 角标在暗色主题下可见

- [ ] **Step 3: 提交代码**

```bash
git add .
git commit -m "feat(keyboard): 添加键盘快捷键选择主题功能

- 新增 useKeyboardShortcuts hook 监听数字键和字母键
- 支持 1-0 对应前 10 个分类，Q-M 对应后续分类
- CategoryList 显示快捷键角标提示
- 首页和游戏页均支持快捷键切换

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```
