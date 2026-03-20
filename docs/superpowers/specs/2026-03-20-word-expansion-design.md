# 单词扩展与布局优化设计规格

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**目标:** 扩展单词数量并优化分类布局，为 2-4 岁幼儿提供更丰富的学习内容

**架构:** 数据驱动设计，通过修改 `words.json` 数据文件和 `CategoryList` 组件布局实现

**技术栈:** React + TypeScript + Tailwind CSS

---

## 变更概览

### 布局变更
- 从 5×2 网格改为 **4×3 网格**（12 格）
- 当前 10 分类 + 新增 1 分类 = **11 分类**（空 1 格备用）

### 分类变更
| 分类 | 变更 | 最终数量 |
|------|------|----------|
| 动物世界 | 新增 8 个，去掉 2 个 | 16 |
| 缤纷色彩 | 新增 3 个 | 11 |
| 数字王国 | 新增 1 个 | 11 |
| 我的家 | 新增 6 个 | 14 |
| 交通工具 | 新增 4 个 | 12 |
| 家庭成员 | 无变更 | 8 |
| 身体部位 | 新增 5 个 | 13 |
| 服装配饰 | 新增 4 个 | 12 |
| 自然植物 | 新增 6 个 | 14 |
| 美味水果 | **新建分类** | 12 |
| 美味食物 | 移出水果，新增 4 个 | 8 |

---

## 详细单词清单

### 1. 动物世界（16 个）

**现有保留：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| cat | 🐱 | Cat | 猫咪 | [kæt] |
| dog | 🐕 | Dog | 狗狗 | [dɒɡ] |
| bird | 🐦 | Bird | 小鸟 | [bɜːd] |
| fish | 🐟 | Fish | 鱼 | [fɪʃ] |
| rabbit | 🐰 | Rabbit | 兔子 | [ˈræbɪt] |
| elephant | 🐘 | Elephant | 大象 | [ˈelɪfənt] |
| lion | 🦁 | Lion | 狮子 | [ˈlaɪən] |
| bear | 🐻 | Bear | 熊 | [beə] |
| monkey | 🐵 | Monkey | 猴子 | [ˈmʌŋki] |
| pig | 🐷 | Pig | 猪 | [pɪɡ] |

**新增：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| duck | 🦆 | Duck | 鸭子 | [dʌk] |
| chicken | 🐔 | Chicken | 小鸡 | [ˈtʃɪkɪn] |
| cow | 🐄 | Cow | 牛 | [kaʊ] |
| sheep | 🐑 | Sheep | 绵羊 | [ʃiːp] |
| horse | 🐴 | Horse | 马 | [hɔːs] |
| frog | 🐸 | Frog | 青蛙 | [frɒɡ] |

---

### 2. 缤纷色彩（11 个）

**现有保留：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| red | 🔴 | Red | 红色 | [red] |
| blue | 🔵 | Blue | 蓝色 | [bluː] |
| green | 🟢 | Green | 绿色 | [ɡriːn] |
| yellow | 🟡 | Yellow | 黄色 | [ˈjeləʊ] |
| purple | 🟣 | Purple | 紫色 | [ˈpɜːpl] |
| orange-color | 🟠 | Orange | 橙色 | [ˈɒrɪndʒ] |
| pink | 💗 | Pink | 粉色 | [pɪŋk] |
| black | ⚫ | Black | 黑色 | [blæk] |

**新增：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| white | ⚪ | White | 白色 | [waɪt] |
| grey | 🩶 | Grey | 灰色 | [ɡreɪ] |
| brown | 🟤 | Brown | 棕色 | [braʊn] |

---

### 3. 数字王国（11 个）

**现有保留：** one 到 ten（10 个）

**新增：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| zero | 0️⃣ | Zero | 零 | [ˈzɪərəʊ] |

---

### 4. 我的家（14 个）

**现有保留：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| house | 🏠 | House | 房子 | [haʊs] |
| bed | 🛏️ | Bed | 床 | [bed] |
| chair | 🪑 | Chair | 椅子 | [tʃeə] |
| door | 🚪 | Door | 门 | [dɔː] |
| window | 🪟 | Window | 窗户 | [ˈwɪndəʊ] |
| lamp | 💡 | Lamp | 灯 | [læmp] |
| clock | 🕐 | Clock | 时钟 | [klɒk] |

**修改（修复 emoji 重复）：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| table | 📋 | Table | 桌子 | [ˈteɪbl] |

**新增：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| sofa | 🛋️ | Sofa | 沙发 | [ˈsəʊfə] |
| tv | 📺 | TV | 电视 | [ˌtiːˈviː] |
| fridge | 🧊 | Fridge | 冰箱 | [frɪdʒ] |
| phone | 📞 | Phone | 电话 | [fəʊn] |
| book | 📚 | Book | 书 | [bʊk] |
| cup | 🥤 | Cup | 杯子 | [kʌp] |

---

### 5. 交通工具（12 个）

**现有保留：** car, bus, bike, train, plane, boat, helicopter, ship（8 个）

**新增：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| taxi | 🚕 | Taxi | 出租车 | [ˈtæksi] |
| subway | 🚇 | Subway | 地铁 | [ˈsʌbweɪ] |
| truck | 🚛 | Truck | 卡车 | [trʌk] |
| motorcycle | 🏍️ | Motorcycle | 摩托车 | [ˈməʊtəsaɪkl] |

---

### 6. 家庭成员（8 个）

**无变更**

---

### 7. 身体部位（13 个）

**现有保留：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| head | 🗣️ | Head | 头 | [hed] |
| eye | 👁️ | Eye | 眼睛 | [aɪ] |
| ear | 👂 | Ear | 耳朵 | [ɪə] |
| nose | 👃 | Nose | 鼻子 | [nəʊz] |
| mouth | 👄 | Mouth | 嘴巴 | [maʊθ] |
| hand | 🖐️ | Hand | 手 | [hænd] |
| foot | 🦶 | Foot | 脚 | [fʊt] |
| arm | 💪 | Arm | 手臂 | [ɑːm] |

**新增：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| finger | 🤚 | Finger | 手指 | [ˈfɪŋɡə] |
| leg | 🦿 | Leg | 腿 | [leɡ] |
| knee | 🦵 | Knee | 膝盖 | [niː] |
| tooth | 🦷 | Tooth | 牙齿 | [tuːθ] |
| hair | 💇 | Hair | 头发 | [heə] |

---

### 8. 服装配饰（12 个）

**现有保留：** pants, dress, shoe, hat, sock, glove, scarf（7 个）

**修改（修复 emoji 重复）：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| shirt | 👔 | Shirt | 衬衫 | [ʃɜːt] |

**新增：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| tshirt | 👕 | T-shirt | T恤 | [ˈtiː ʃɜːt] |
| coat | 🧥 | Coat | 外套 | [kəʊt] |
| glasses | 👓 | Glasses | 眼镜 | [ˈɡlɑːsɪz] |
| watch | ⌚ | Watch | 手表 | [wɒtʃ] |

---

### 9. 自然植物（14 个）

**现有保留：** tree, flower, sun, moon, star, cloud, rain, snow（8 个）

**新增：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| grass | 🌿 | Grass | 草 | [ɡrɑːs] |
| leaf | 🍃 | Leaf | 叶子 | [liːf] |
| mountain | ⛰️ | Mountain | 山 | [ˈmaʊntɪn] |
| river | 🏞️ | River | 河流 | [ˈrɪvə] |
| sea | 🌊 | Sea | 大海 | [siː] |
| wind | 💨 | Wind | 风 | [wɪnd] |

---

### 10. 美味水果（新建分类）- 12 个

**配色方案：**
- 图标：🍇
- 名称：美味水果
- 文字色：#C026D3（洋红）
- 背景色：#FAE8FF（浅紫）

**单词：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| apple | 🍎 | Apple | 苹果 | [ˈæpl] |
| banana | 🍌 | Banana | 香蕉 | [bəˈnɑːnə] |
| orange | 🍊 | Orange | 橙子 | [ˈɒrɪndʒ] |
| grape | 🍇 | Grape | 葡萄 | [ɡreɪp] |
| peach | 🍑 | Peach | 桃子 | [piːtʃ] |
| watermelon | 🍉 | Watermelon | 西瓜 | [ˈwɔːtəmelən] |
| strawberry | 🍓 | Strawberry | 草莓 | [ˈstrɔːbəri] |
| cherry | 🍒 | Cherry | 樱桃 | [ˈtʃeri] |
| lemon | 🍋 | Lemon | 柠檬 | [ˈlemən] |
| pear | 🍐 | Pear | 梨 | [peə] |
| mango | 🥭 | Mango | 芒果 | [ˈmæŋɡəʊ] |
| pineapple | 🍍 | Pineapple | 菠萝 | [ˈpaɪnæpl] |

---

### 11. 美味食物（8 个）

**保留（从原食物分类）：** cake, bread, milk, egg（4 个）

**新增：**
| ID | Emoji | English | Chinese | Phonetic |
|----|-------|---------|---------|----------|
| cookie | 🍪 | Cookie | 饼干 | [ˈkʊki] |
| cheese | 🧀 | Cheese | 奶酪 | [tʃiːz] |
| rice | 🍚 | Rice | 米饭 | [raɪs] |
| noodles | 🍝 | Noodles | 面条 | [ˈnuːdlz] |

---

## Emoji 重复修复汇总

| 单词 | 原 Emoji | 修正为 |
|------|----------|--------|
| Table | 🪑（与 Chair 重复）| 📋 |
| Finger | 🖐️（与 Hand 重复）| 🤚 |
| Leg | 🦵（与 Knee 重复）| 🦿 |
| Shirt | 👕（与 T-shirt 重复）| 👔 |

---

## 文件变更

### 数据文件
- `src/data/words.json` - 更新单词数据

### 组件文件
- `src/components/CategoryList/CategoryList.tsx` - 网格布局改为 4×3

### 类型文件（如需）
- `src/types/index.ts` - 确认 Category 接口兼容
