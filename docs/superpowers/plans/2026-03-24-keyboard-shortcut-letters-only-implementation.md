# 快捷键改为纯字母 - 实施计划

> **For agentic workers:** REQUIRED SKILL: Use planning-with-files to implement this plan task-by-task.

> 创建日期: 2026-03-24
> 状态: Ready

## 概述

将主题选择的键盘快捷键从"数字+字母"改为纯字母映射（QWERTY顺序）。

## 任务列表

### Task 1: 修改快捷键映射常量

**文件**: `src/hooks/useKeyboardShortcuts.ts`

**变更**:
```typescript
// 从
const SHORTCUT_KEYS = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';

// 改为
const SHORTCUT_KEYS = 'QWERTYUIOPASDFGHJKLZXCVBNM';
```

**说明**: 去掉前10个数字字符，保留26个字母。

### Task 2: 验证功能

1. 启动开发服务器
2. 测试字母键 Q、W、E 等是否能选择对应分类
3. 确认数字键 1-9、0 不再响应

## 完成标准

- [ ] SHORTCUT_KEYS 常量已修改为纯字母
- [ ] 字母键快捷键正常工作
- [ ] 数字键不再触发分类选择
