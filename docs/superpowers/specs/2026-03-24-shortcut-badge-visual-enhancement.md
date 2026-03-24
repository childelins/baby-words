# 快捷键角标视觉优化设计文档

> Created: 2026-03-24
> Status: Draft

## 概述

将分类选择按钮上的快捷键角标从统一的黑色半透明背景改为使用对应分类的主题色背景，使角标与分类视觉融合，提升整体视觉一致性。

## 背景

当前实现（`CategoryList.tsx` 第70-75行）：
```tsx
<span className="absolute top-0.5 right-0.5 text-[8px] font-medium text-white/60 bg-black/20 px-1 py-0.5 rounded">
  {shortcutKey}
</span>
```

问题：角标使用固定的 `bg-black/20` 背景，未与各分类的主题色关联，视觉上显得突兀。

## 设计方案

### 核心变更

将角标背景从 `bg-black/20` 改为使用 `category.color` 配合适当的透明度。

### 技术实现

```tsx
{shortcutKey && (
  <span
    className="absolute top-0.5 right-0.5 text-[8px] font-medium text-white px-1 py-0.5 rounded"
    style={{ backgroundColor: `${category.color}99` }}
  >
    {shortcutKey}
  </span>
)}
```

### 颜色透明度选择

用户确认选择方案 B：提高饱和度（约 60% 不透明度）

实现方式：使用 HEX 颜色值 + 透明度后缀
- `${category.color}99` 表示 60% 不透明度（十六进制 99 = 十进制 153/255 ≈ 60%）
- 或使用 `${category.color}BF` 表示 75% 不透明度

**推荐值**：`99`（60% 不透明度）

### 文字颜色

文字从 `text-white/60` 改为 `text-white`（完全不透明的白色），确保在彩色背景上有足够的对比度。

## 视觉效果预期

| 分类 | 主题色 | 角标背景效果 |
|------|--------|--------------|
| 动物世界 | #16A34A | 绿色半透明 |
| 美味食物 | #EA580C | 橙色半透明 |
| 美味水果 | #C026D3 | 紫色半透明 |
| 缤纷色彩 | #4F46E5 | 靛蓝色半透明 |
| 数字王国 | #DB2777 | 粉色半透明 |
| 我的家 | #CA8A04 | 金黄色半透明 |
| 交通工具 | #2563EB | 蓝色半透明 |
| 家庭成员 | #DB2777 | 粉色半透明 |
| 身体部位 | #059669 | 青绿色半透明 |
| 服装配饰 | #D97706 | 琥珀色半透明 |
| 自然植物 | #16A34A | 绿色半透明 |

## 实现步骤

1. 修改 `src/components/CategoryList/CategoryList.tsx`
2. 将第72行的角标样式从 Tailwind 类改为内联 style
3. 更新背景色为 `${category.color}99`
4. 更新文字颜色为 `text-white`

## 测试要点

1. 验证所有分类的角标显示正确的主题色
2. 确保白色文字在所有彩色背景上可读
3. 检查深色/浅色主题下的显示效果（如支持）
4. 确认角标位置和尺寸保持不变

## 风险评估

- 低风险：仅修改视觉样式，不影响功能逻辑
- 向后兼容：无 API 变更

## 参考文件

- 源文件：`src/components/CategoryList/CategoryList.tsx`
- 数据源：`src/data/words.json`（分类颜色定义）
- 类型定义：`src/types/index.ts`（Category 接口）
