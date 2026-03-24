# 快捷键角标视觉优化实现计划

> **For agentic workers:** REQUIRED SKILL: Use planning-with-files to implement this plan task-by-task.

## 概述

将分类选择按钮上的快捷键角标从统一的黑色半透明背景改为使用对应分类的主题色背景，实现视觉融合。

## 任务清单

### Task 1: 修改角标样式

**文件**: `src/components/CategoryList/CategoryList.tsx`

**修改内容**:

将第72行的角标代码：
```tsx
<span className="absolute top-0.5 right-0.5 text-[8px] font-medium text-white/60 bg-black/20 px-1 py-0.5 rounded">
  {shortcutKey}
</span>
```

改为：
```tsx
<span
  className="absolute top-0.5 right-0.5 text-[8px] font-medium text-white px-1 py-0.5 rounded"
  style={{ backgroundColor: `${category.color}99` }}
>
  {shortcutKey}
</span>
```

**变更说明**:
- 移除 `bg-black/20` Tailwind 类
- 移除 `text-white/60` 改为 `text-white`（纯白）
- 添加内联 `style={{ backgroundColor: `${category.color}99` }}`
- `${category.color}99` 表示 60% 不透明度

### Task 2: 验证效果

- 构建验证：`npm run build`
- 视觉检查：确认各分类角标显示正确的主题色
