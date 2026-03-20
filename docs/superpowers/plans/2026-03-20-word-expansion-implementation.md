# 单词扩展与布局优化实现计划

> **For agentic workers:** REQUIRED SKILL: Use planning-with-files to implement this plan task-by-task.

**Goal:** 扩展单词数量并优化分类布局，新增美味水果分类，修改网格布局

**Architecture:** 数据驱动，修改 `words.json` 数据文件和 `CategoryList` 组件布局样式

**Tech Stack:** React + TypeScript + Tailwind CSS

---

## 文件变更概览

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/data/words.json` | 修改 | 更新所有分类单词数据 |
| `src/components/CategoryList/CategoryList.tsx` | 修改 | 网格布局 5×2 → 4×3 |

---

## Task 1: 更新单词数据

**Files:**
- Modify: `src/data/words.json`

### 1.1 修改动物世界分类

- [ ] **Step 1: 更新动物世界分类**

在 `animals` 分类中添加新单词，最终列表为：

```json
{
  "id": "animals",
  "name": "动物世界",
  "icon": "🐾",
  "color": "#16A34A",
  "bgColor": "#F0FDF4",
  "words": [
    { "id": "cat", "emoji": "🐱", "english": "Cat", "chinese": "猫咪", "phonetic": "[kæt]", "categoryId": "animals" },
    { "id": "dog", "emoji": "🐕", "english": "Dog", "chinese": "狗狗", "phonetic": "[dɒɡ]", "categoryId": "animals" },
    { "id": "bird", "emoji": "🐦", "english": "Bird", "chinese": "小鸟", "phonetic": "[bɜːd]", "categoryId": "animals" },
    { "id": "fish", "emoji": "🐟", "english": "Fish", "chinese": "鱼", "phonetic": "[fɪʃ]", "categoryId": "animals" },
    { "id": "rabbit", "emoji": "🐰", "english": "Rabbit", "chinese": "兔子", "phonetic": "[ˈræbɪt]", "categoryId": "animals" },
    { "id": "elephant", "emoji": "🐘", "english": "Elephant", "chinese": "大象", "phonetic": "[ˈelɪfənt]", "categoryId": "animals" },
    { "id": "lion", "emoji": "🦁", "english": "Lion", "chinese": "狮子", "phonetic": "[ˈlaɪən]", "categoryId": "animals" },
    { "id": "bear", "emoji": "🐻", "english": "Bear", "chinese": "熊", "phonetic": "[beə]", "categoryId": "animals" },
    { "id": "monkey", "emoji": "🐵", "english": "Monkey", "chinese": "猴子", "phonetic": "[ˈmʌŋki]", "categoryId": "animals" },
    { "id": "pig", "emoji": "🐷", "english": "Pig", "chinese": "猪", "phonetic": "[pɪɡ]", "categoryId": "animals" },
    { "id": "duck", "emoji": "🦆", "english": "Duck", "chinese": "鸭子", "phonetic": "[dʌk]", "categoryId": "animals" },
    { "id": "chicken", "emoji": "🐔", "english": "Chicken", "chinese": "小鸡", "phonetic": "[ˈtʃɪkɪn]", "categoryId": "animals" },
    { "id": "cow", "emoji": "🐄", "english": "Cow", "chinese": "牛", "phonetic": "[kaʊ]", "categoryId": "animals" },
    { "id": "sheep", "emoji": "🐑", "english": "Sheep", "chinese": "绵羊", "phonetic": "[ʃiːp]", "categoryId": "animals" },
    { "id": "horse", "emoji": "🐴", "english": "Horse", "chinese": "马", "phonetic": "[hɔːs]", "categoryId": "animals" },
    { "id": "frog", "emoji": "🐸", "english": "Frog", "chinese": "青蛙", "phonetic": "[frɒɡ]", "categoryId": "animals" }
  ]
}
```

### 1.2 修改缤纷色彩分类

- [ ] **Step 2: 更新缤纷色彩分类**

在 `colors` 分类末尾添加：

```json
{ "id": "white", "emoji": "⚪", "english": "White", "chinese": "白色", "phonetic": "[waɪt]", "categoryId": "colors" },
{ "id": "grey", "emoji": "🩶", "english": "Grey", "chinese": "灰色", "phonetic": "[ɡreɪ]", "categoryId": "colors" },
{ "id": "brown", "emoji": "🟤", "english": "Brown", "chinese": "棕色", "phonetic": "[braʊn]", "categoryId": "colors" }
```

### 1.3 修改数字王国分类

- [ ] **Step 3: 更新数字王国分类**

在 `numbers` 分类开头添加：

```json
{ "id": "zero", "emoji": "0️⃣", "english": "Zero", "chinese": "零", "phonetic": "[ˈzɪərəʊ]", "categoryId": "numbers" },
```

### 1.4 修改我的家分类

- [ ] **Step 4: 更新我的家分类**

修改 `table` 的 emoji 并添加新单词：

```json
{
  "id": "home",
  "name": "我的家",
  "icon": "🏠",
  "color": "#CA8A04",
  "bgColor": "#FEFCE8",
  "words": [
    { "id": "house", "emoji": "🏠", "english": "House", "chinese": "房子", "phonetic": "[haʊs]", "categoryId": "home" },
    { "id": "bed", "emoji": "🛏️", "english": "Bed", "chinese": "床", "phonetic": "[bed]", "categoryId": "home" },
    { "id": "chair", "emoji": "🪑", "english": "Chair", "chinese": "椅子", "phonetic": "[tʃeə]", "categoryId": "home" },
    { "id": "door", "emoji": "🚪", "english": "Door", "chinese": "门", "phonetic": "[dɔː]", "categoryId": "home" },
    { "id": "window", "emoji": "🪟", "english": "Window", "chinese": "窗户", "phonetic": "[ˈwɪndəʊ]", "categoryId": "home" },
    { "id": "table", "emoji": "📋", "english": "Table", "chinese": "桌子", "phonetic": "[ˈteɪbl]", "categoryId": "home" },
    { "id": "lamp", "emoji": "💡", "english": "Lamp", "chinese": "灯", "phonetic": "[læmp]", "categoryId": "home" },
    { "id": "clock", "emoji": "🕐", "english": "Clock", "chinese": "时钟", "phonetic": "[klɒk]", "categoryId": "home" },
    { "id": "sofa", "emoji": "🛋️", "english": "Sofa", "chinese": "沙发", "phonetic": "[ˈsəʊfə]", "categoryId": "home" },
    { "id": "tv", "emoji": "📺", "english": "TV", "chinese": "电视", "phonetic": "[ˌtiːˈviː]", "categoryId": "home" },
    { "id": "fridge", "emoji": "🧊", "english": "Fridge", "chinese": "冰箱", "phonetic": "[frɪdʒ]", "categoryId": "home" },
    { "id": "phone", "emoji": "📞", "english": "Phone", "chinese": "电话", "phonetic": "[fəʊn]", "categoryId": "home" },
    { "id": "book", "emoji": "📚", "english": "Book", "chinese": "书", "phonetic": "[bʊk]", "categoryId": "home" },
    { "id": "cup", "emoji": "🥤", "english": "Cup", "chinese": "杯子", "phonetic": "[kʌp]", "categoryId": "home" }
  ]
}
```

### 1.5 修改交通工具分类

- [ ] **Step 5: 更新交通工具分类**

在 `transport` 分类末尾添加：

```json
{ "id": "taxi", "emoji": "🚕", "english": "Taxi", "chinese": "出租车", "phonetic": "[ˈtæksi]", "categoryId": "transport" },
{ "id": "subway", "emoji": "🚇", "english": "Subway", "chinese": "地铁", "phonetic": "[ˈsʌbweɪ]", "categoryId": "transport" },
{ "id": "truck", "emoji": "🚛", "english": "Truck", "chinese": "卡车", "phonetic": "[trʌk]", "categoryId": "transport" },
{ "id": "motorcycle", "emoji": "🏍️", "english": "Motorcycle", "chinese": "摩托车", "phonetic": "[ˈməʊtəsaɪkl]", "categoryId": "transport" }
```

### 1.6 修改身体部位分类

- [ ] **Step 6: 更新身体部位分类**

在 `body` 分类末尾添加：

```json
{ "id": "finger", "emoji": "🤚", "english": "Finger", "chinese": "手指", "phonetic": "[ˈfɪŋɡə]", "categoryId": "body" },
{ "id": "leg", "emoji": "🦿", "english": "Leg", "chinese": "腿", "phonetic": "[leɡ]", "categoryId": "body" },
{ "id": "knee", "emoji": "🦵", "english": "Knee", "chinese": "膝盖", "phonetic": "[niː]", "categoryId": "body" },
{ "id": "tooth", "emoji": "🦷", "english": "Tooth", "chinese": "牙齿", "phonetic": "[tuːθ]", "categoryId": "body" },
{ "id": "hair", "emoji": "💇", "english": "Hair", "chinese": "头发", "phonetic": "[heə]", "categoryId": "body" }
```

### 1.7 修改服装配饰分类

- [ ] **Step 7: 更新服装配饰分类**

修改 `shirt` emoji 并添加新单词：

```json
{
  "id": "clothes",
  "name": "服装配饰",
  "icon": "👕",
  "color": "#D97706",
  "bgColor": "#FEF3C7",
  "words": [
    { "id": "shirt", "emoji": "👔", "english": "Shirt", "chinese": "衬衫", "phonetic": "[ʃɜːt]", "categoryId": "clothes" },
    { "id": "pants", "emoji": "👖", "english": "Pants", "chinese": "裤子", "phonetic": "[pænts]", "categoryId": "clothes" },
    { "id": "dress", "emoji": "👗", "english": "Dress", "chinese": "裙子", "phonetic": "[dres]", "categoryId": "clothes" },
    { "id": "shoe", "emoji": "👟", "english": "Shoe", "chinese": "鞋子", "phonetic": "[ʃuː]", "categoryId": "clothes" },
    { "id": "hat", "emoji": "🎩", "english": "Hat", "chinese": "帽子", "phonetic": "[hæt]", "categoryId": "clothes" },
    { "id": "sock", "emoji": "🧦", "english": "Sock", "chinese": "袜子", "phonetic": "[sɒk]", "categoryId": "clothes" },
    { "id": "glove", "emoji": "🧤", "english": "Glove", "chinese": "手套", "phonetic": "[ɡlʌv]", "categoryId": "clothes" },
    { "id": "scarf", "emoji": "🧣", "english": "Scarf", "chinese": "围巾", "phonetic": "[skɑːf]", "categoryId": "clothes" },
    { "id": "tshirt", "emoji": "👕", "english": "T-shirt", "chinese": "T恤", "phonetic": "[ˈtiː ʃɜːt]", "categoryId": "clothes" },
    { "id": "coat", "emoji": "🧥", "english": "Coat", "chinese": "外套", "phonetic": "[kəʊt]", "categoryId": "clothes" },
    { "id": "glasses", "emoji": "👓", "english": "Glasses", "chinese": "眼镜", "phonetic": "[ˈɡlɑːsɪz]", "categoryId": "clothes" },
    { "id": "watch", "emoji": "⌚", "english": "Watch", "chinese": "手表", "phonetic": "[wɒtʃ]", "categoryId": "clothes" }
  ]
}
```

### 1.8 修改自然植物分类

- [ ] **Step 8: 更新自然植物分类**

在 `nature` 分类末尾添加：

```json
{ "id": "grass", "emoji": "🌿", "english": "Grass", "chinese": "草", "phonetic": "[ɡrɑːs]", "categoryId": "nature" },
{ "id": "leaf", "emoji": "🍃", "english": "Leaf", "chinese": "叶子", "phonetic": "[liːf]", "categoryId": "nature" },
{ "id": "mountain", "emoji": "⛰️", "english": "Mountain", "chinese": "山", "phonetic": "[ˈmaʊntɪn]", "categoryId": "nature" },
{ "id": "river", "emoji": "🏞️", "english": "River", "chinese": "河流", "phonetic": "[ˈrɪvə]", "categoryId": "nature" },
{ "id": "sea", "emoji": "🌊", "english": "Sea", "chinese": "大海", "phonetic": "[siː]", "categoryId": "nature" },
{ "id": "wind", "emoji": "💨", "english": "Wind", "chinese": "风", "phonetic": "[wɪnd]", "categoryId": "nature" }
```

### 1.9 新增美味水果分类

- [ ] **Step 9: 添加美味水果分类**

在 `food` 分类之后插入新分类：

```json
{
  "id": "fruits",
  "name": "美味水果",
  "icon": "🍇",
  "color": "#C026D3",
  "bgColor": "#FAE8FF",
  "words": [
    { "id": "apple", "emoji": "🍎", "english": "Apple", "chinese": "苹果", "phonetic": "[ˈæpl]", "categoryId": "fruits" },
    { "id": "banana", "emoji": "🍌", "english": "Banana", "chinese": "香蕉", "phonetic": "[bəˈnɑːnə]", "categoryId": "fruits" },
    { "id": "orange", "emoji": "🍊", "english": "Orange", "chinese": "橙子", "phonetic": "[ˈɒrɪndʒ]", "categoryId": "fruits" },
    { "id": "grape", "emoji": "🍇", "english": "Grape", "chinese": "葡萄", "phonetic": "[ɡreɪp]", "categoryId": "fruits" },
    { "id": "peach", "emoji": "🍑", "english": "Peach", "chinese": "桃子", "phonetic": "[piːtʃ]", "categoryId": "fruits" },
    { "id": "watermelon", "emoji": "🍉", "english": "Watermelon", "chinese": "西瓜", "phonetic": "[ˈwɔːtəmelən]", "categoryId": "fruits" },
    { "id": "strawberry", "emoji": "🍓", "english": "Strawberry", "chinese": "草莓", "phonetic": "[ˈstrɔːbəri]", "categoryId": "fruits" },
    { "id": "cherry", "emoji": "🍒", "english": "Cherry", "chinese": "樱桃", "phonetic": "[ˈtʃeri]", "categoryId": "fruits" },
    { "id": "lemon", "emoji": "🍋", "english": "Lemon", "chinese": "柠檬", "phonetic": "[ˈlemən]", "categoryId": "fruits" },
    { "id": "pear", "emoji": "🍐", "english": "Pear", "chinese": "梨", "phonetic": "[peə]", "categoryId": "fruits" },
    { "id": "mango", "emoji": "🥭", "english": "Mango", "chinese": "芒果", "phonetic": "[ˈmæŋɡəʊ]", "categoryId": "fruits" },
    { "id": "pineapple", "emoji": "🍍", "english": "Pineapple", "chinese": "菠萝", "phonetic": "[ˈpaɪnæpl]", "categoryId": "fruits" }
  ]
}
```

### 1.10 修改美味食物分类

- [ ] **Step 10: 更新美味食物分类**

移除水果单词，保留并新增食物：

```json
{
  "id": "food",
  "name": "美味食物",
  "icon": "🍎",
  "color": "#EA580C",
  "bgColor": "#FFF7ED",
  "words": [
    { "id": "cake", "emoji": "🎂", "english": "Cake", "chinese": "蛋糕", "phonetic": "[keɪk]", "categoryId": "food" },
    { "id": "bread", "emoji": "🍞", "english": "Bread", "chinese": "面包", "phonetic": "[bred]", "categoryId": "food" },
    { "id": "milk", "emoji": "🥛", "english": "Milk", "chinese": "牛奶", "phonetic": "[mɪlk]", "categoryId": "food" },
    { "id": "egg", "emoji": "🥚", "english": "Egg", "chinese": "鸡蛋", "phonetic": "[eɡ]", "categoryId": "food" },
    { "id": "cookie", "emoji": "🍪", "english": "Cookie", "chinese": "饼干", "phonetic": "[ˈkʊki]", "categoryId": "food" },
    { "id": "cheese", "emoji": "🧀", "english": "Cheese", "chinese": "奶酪", "phonetic": "[tʃiːz]", "categoryId": "food" },
    { "id": "rice", "emoji": "🍚", "english": "Rice", "chinese": "米饭", "phonetic": "[raɪs]", "categoryId": "food" },
    { "id": "noodles", "emoji": "🍝", "english": "Noodles", "chinese": "面条", "phonetic": "[ˈnuːdlz]", "categoryId": "food" }
  ]
}
```

---

## Task 2: 修改分类网格布局

**Files:**
- Modify: `src/components/CategoryList/CategoryList.tsx`

### 2.1 修改网格样式

- [ ] **Step 1: 更新网格布局从 5×2 到 4×3**

找到 CategoryList 组件中的网格样式，修改为 4 列布局：

```tsx
// 修改前 (5×2 网格)
className="grid grid-cols-2 gap-3"

// 修改后 (4×3 网格)
className="grid grid-cols-3 md:grid-cols-4 gap-3"
```

- [ ] **Step 2: 验证构建**

Run: `npm run build`
Expected: 构建成功

---

## Task 3: 验证与提交

### 3.1 构建验证

- [ ] **Step 1: 运行构建**

```bash
npm run build
```

Expected: 构建成功，无错误

### 3.2 功能验证

- [ ] **Step 2: 启动开发服务器并验证**

```bash
npm run dev
```

验证项目：
1. 分类列表显示 11 个分类（4×3 布局）
2. 美味水果分类显示正确
3. 各分类单词数量正确
4. 无 emoji 重复问题

### 3.3 提交

- [ ] **Step 3: 提交变更**

```bash
git add src/data/words.json src/components/CategoryList/CategoryList.tsx docs/superpowers/
git commit -m "feat: 扩展单词数量并优化分类布局

- 新增美味水果分类（12个单词）
- 各分类新增常用单词（共 47 个新单词）
- 修复 emoji 重复问题
- 网格布局从 5×2 改为 4×3

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## 变更汇总

| 指标 | 变更前 | 变更后 |
|------|--------|--------|
| 分类数 | 10 | 11 |
| 单词总数 | ~84 | ~131 |
| 新增单词 | - | 47 |
| 网格布局 | 5×2 | 4×3 |
