# Findings & Decisions

## Requirements
- 目标用户：三岁宝宝
- 核心功能：卡片式单词学习
- 关键要求：有趣好玩
- 交互方式：简单、大按钮、触摸友好

## Research Findings
- 三岁儿童认知特点：
  - 注意力约 5-10 分钟
  - 对鲜艳颜色敏感（红、黄、蓝、绿）
  - 喜欢动物、食物、交通工具等主题
  - 需要即时反馈和奖励

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| 纯HTML/CSS/JS单文件 | 无需服务器，双击即可打开 |
| Web Speech API | 浏览器内置，无需音频文件 |
| 4种声音配置 | 可爱小姐姐、快乐小哥哥、萌萌宝宝音、亲切老师 |
| localStorage存储偏好 | 记住用户选择的声音 |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| 空格键播放延迟 | Web Speech API 需要等待 voices 加载完成；使用 voiceschanged 事件预热 |
| 首次播放延迟 | Chrome 已知问题，需要在页面加载时预先触发静音播放来预热引擎 |
| 英文发音缺失 | getVoice 函数 fallback 到 voices[0] 可能是中文声音；修复为返回 null 让浏览器使用 lang 属性选择默认声音 |

## Resources
- 待添加

## Visual/Browser Findings
- 待添加

---
*Update this file after every 2 view/browser/search operations*
