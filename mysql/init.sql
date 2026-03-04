-- Baby Words Database Initialization Script
-- Creates database, tables, and seeds initial data

-- Create database
CREATE DATABASE IF NOT EXISTS baby_words CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE baby_words;

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    emoji VARCHAR(10) NOT NULL,
    gradient VARCHAR(100) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create words table
CREATE TABLE IF NOT EXISTS words (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id VARCHAR(50) NOT NULL,
    emoji VARCHAR(10) NOT NULL,
    cn VARCHAR(100) NOT NULL,
    en VARCHAR(100) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_category_id (category_id),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create learning_logs table
CREATE TABLE IF NOT EXISTS learning_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    word_id BIGINT UNSIGNED NOT NULL,
    action VARCHAR(10) NOT NULL,
    ip_address VARCHAR(50),
    user_agent VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_word_id (word_id),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (word_id) REFERENCES words(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Clear existing data
DELETE FROM learning_logs;
DELETE FROM words;
DELETE FROM categories;

-- Seed categories
INSERT INTO categories (id, title, emoji, gradient, sort_order) VALUES
('animals', '动物世界', '🐶', 'from-theme-animal to-theme-animal-light', 1),
('fruits', '美味水果', '🍎', 'from-theme-fruit to-theme-fruit-light', 2),
('colors', '颜色形状', '🔴', 'from-theme-color to-theme-color-light', 3),
('vehicles', '交通工具', '🚗', 'from-theme-transport to-theme-transport-light', 4),
('family', '家庭成员', '👨‍👩‍👧', 'from-theme-family to-theme-family-light', 5),
('body', '身体部位', '🫶', 'from-theme-body to-theme-body-light', 6),
('daily', '日常用品', '🎒', 'from-theme-daily to-theme-daily-light', 7),
('nature', '天气自然', '🌈', 'from-theme-nature to-theme-nature-light', 8),
('numbers', '数字乐园', '🔢', 'from-theme-number to-theme-number-light', 9);

-- Seed words for animals category
INSERT INTO words (category_id, emoji, cn, en, sort_order) VALUES
('animals', '🐶', '小狗', 'dog', 1),
('animals', '🐱', '小猫', 'cat', 2),
('animals', '🐰', '兔子', 'rabbit', 3),
('animals', '🐘', '大象', 'elephant', 4),
('animals', '🦁', '狮子', 'lion', 5),
('animals', '🐯', '老虎', 'tiger', 6),
('animals', '🐻', '熊', 'bear', 7),
('animals', '🐼', '熊猫', 'panda', 8),
('animals', '🦊', '狐狸', 'fox', 9),
('animals', '🐮', '奶牛', 'cow', 10),
('animals', '🐷', '小猪', 'pig', 11),
('animals', '🐸', '青蛙', 'frog', 12),
('animals', '🦋', '蝴蝶', 'butterfly', 13),
('animals', '🐦', '小鸟', 'bird', 14),
('animals', '🐟', '鱼', 'fish', 15),
('animals', '🐢', '乌龟', 'turtle', 16);

-- Seed words for fruits category
INSERT INTO words (category_id, emoji, cn, en, sort_order) VALUES
('fruits', '🍎', '苹果', 'apple', 1),
('fruits', '🍌', '香蕉', 'banana', 2),
('fruits', '🍊', '橙子', 'orange', 3),
('fruits', '🍇', '葡萄', 'grape', 4),
('fruits', '🍓', '草莓', 'strawberry', 5),
('fruits', '🍉', '西瓜', 'watermelon', 6),
('fruits', '🍑', '桃子', 'peach', 7),
('fruits', '🍒', '樱桃', 'cherry', 8),
('fruits', '🥝', '猕猴桃', 'kiwi', 9),
('fruits', '🍋', '柠檬', 'lemon', 10),
('fruits', '🥕', '胡萝卜', 'carrot', 11),
('fruits', '🌽', '玉米', 'corn', 12),
('fruits', '🍞', '面包', 'bread', 13),
('fruits', '🧀', '奶酪', 'cheese', 14),
('fruits', '🍕', '披萨', 'pizza', 15),
('fruits', '🍦', '冰淇淋', 'ice cream', 16);

-- Seed words for colors category
INSERT INTO words (category_id, emoji, cn, en, sort_order) VALUES
('colors', '🔴', '红色', 'red', 1),
('colors', '🟠', '橙色', 'orange', 2),
('colors', '🟡', '黄色', 'yellow', 3),
('colors', '🟢', '绿色', 'green', 4),
('colors', '🔵', '蓝色', 'blue', 5),
('colors', '🟣', '紫色', 'purple', 6),
('colors', '⚪', '白色', 'white', 7),
('colors', '⚫', '黑色', 'black', 8),
('colors', '🩷', '粉色', 'pink', 9),
('colors', '🤎', '棕色', 'brown', 10),
('colors', '⬛', '正方形', 'square', 11),
('colors', '⭕', '圆形', 'circle', 12),
('colors', '🔺', '三角形', 'triangle', 13),
('colors', '⭐', '星形', 'star', 14),
('colors', '❤️', '心形', 'heart', 15),
('colors', '🌙', '月牙', 'moon', 16);

-- Seed words for vehicles category
INSERT INTO words (category_id, emoji, cn, en, sort_order) VALUES
('vehicles', '🚗', '汽车', 'car', 1),
('vehicles', '🚌', '公交车', 'bus', 2),
('vehicles', '🚕', '出租车', 'taxi', 3),
('vehicles', '🚑', '救护车', 'ambulance', 4),
('vehicles', '🚒', '消防车', 'fire truck', 5),
('vehicles', '🚚', '卡车', 'truck', 6),
('vehicles', '🚲', '自行车', 'bicycle', 7),
('vehicles', '🛵', '摩托车', 'scooter', 8),
('vehicles', '✈️', '飞机', 'airplane', 9),
('vehicles', '🚁', '直升机', 'helicopter', 10),
('vehicles', '🚂', '火车', 'train', 11),
('vehicles', '🚢', '轮船', 'ship', 12),
('vehicles', '⛵', '帆船', 'sailboat', 13),
('vehicles', '🚀', '火箭', 'rocket', 14),
('vehicles', '🛸', '飞碟', 'UFO', 15),
('vehicles', '🚠', '缆车', 'cable car', 16);

-- Seed words for family category
INSERT INTO words (category_id, emoji, cn, en, sort_order) VALUES
('family', '👨', '爸爸', 'daddy', 1),
('family', '👩', '妈妈', 'mommy', 2),
('family', '👴', '爷爷', 'grandpa', 3),
('family', '👵', '奶奶', 'grandma', 4),
('family', '👦', '哥哥', 'brother', 5),
('family', '👧', '姐姐', 'sister', 6),
('family', '👶', '宝宝', 'baby', 7),
('family', '🧒', '弟弟', 'brother', 8),
('family', '👧', '妹妹', 'sister', 9),
('family', '🧑', '叔叔', 'uncle', 10),
('family', '👩', '阿姨', 'aunt', 11),
('family', '👴', '外公', 'grandpa', 12),
('family', '👵', '外婆', 'grandma', 13),
('family', '🏠', '家', 'home', 14),
('family', '❤️', '爱', 'love', 15),
('family', '👨‍👩‍👧', '全家', 'family', 16);

-- Seed words for body category
INSERT INTO words (category_id, emoji, cn, en, sort_order) VALUES
('body', '👀', '眼睛', 'eyes', 1),
('body', '👃', '鼻子', 'nose', 2),
('body', '👄', '嘴巴', 'mouth', 3),
('body', '👂', '耳朵', 'ears', 4),
('body', '🦷', '牙齿', 'teeth', 5),
('body', '👅', '舌头', 'tongue', 6),
('body', '✋', '手', 'hand', 7),
('body', '🦶', '脚', 'foot', 8),
('body', '🦵', '腿', 'leg', 9),
('body', '💪', '手臂', 'arm', 10),
('body', '🫀', '心脏', 'heart', 11),
('body', '🧠', '大脑', 'brain', 12),
('body', '🦴', '骨头', 'bone', 13),
('body', '💅', '指甲', 'nail', 14),
('body', '👱', '头发', 'hair', 15),
('body', '🫦', '嘴唇', 'lips', 16);

-- Seed words for daily category
INSERT INTO words (category_id, emoji, cn, en, sort_order) VALUES
('daily', '🪥', '牙刷', 'toothbrush', 1),
('daily', '🛁', '浴缸', 'bathtub', 2),
('daily', '🧴', '肥皂', 'soap', 3),
('daily', '🧣', '围巾', 'scarf', 4),
('daily', '🎩', '帽子', 'hat', 5),
('daily', '👟', '鞋子', 'shoes', 6),
('daily', '🧦', '袜子', 'socks', 7),
('daily', '👕', '衣服', 'shirt', 8),
('daily', '👖', '裤子', 'pants', 9),
('daily', '🧥', '外套', 'coat', 10),
('daily', '🛏️', '床', 'bed', 11),
('daily', '🪑', '椅子', 'chair', 12),
('daily', '💡', '灯', 'lamp', 13),
('daily', '📺', '电视', 'TV', 14),
('daily', '📱', '手机', 'phone', 15),
('daily', '🔑', '钥匙', 'key', 16);

-- Seed words for nature category
INSERT INTO words (category_id, emoji, cn, en, sort_order) VALUES
('nature', '☀️', '太阳', 'sun', 1),
('nature', '🌙', '月亮', 'moon', 2),
('nature', '⭐', '星星', 'star', 3),
('nature', '☁️', '云', 'cloud', 4),
('nature', '🌧️', '雨', 'rain', 5),
('nature', '❄️', '雪', 'snow', 6),
('nature', '🌈', '彩虹', 'rainbow', 7),
('nature', '⚡', '闪电', 'lightning', 8),
('nature', '🌊', '大海', 'sea', 9),
('nature', '🏞️', '河流', 'river', 10),
('nature', '⛰️', '山', 'mountain', 11),
('nature', '🌲', '树', 'tree', 12),
('nature', '🌸', '花', 'flower', 13),
('nature', '🌿', '草', 'grass', 14),
('nature', '🌱', '种子', 'seed', 15),
('nature', '🍄', '蘑菇', 'mushroom', 16);

-- Seed words for numbers category
INSERT INTO words (category_id, emoji, cn, en, sort_order) VALUES
('numbers', '1️⃣', '一', 'one', 1),
('numbers', '2️⃣', '二', 'two', 2),
('numbers', '3️⃣', '三', 'three', 3),
('numbers', '4️⃣', '四', 'four', 4),
('numbers', '5️⃣', '五', 'five', 5),
('numbers', '6️⃣', '六', 'six', 6),
('numbers', '7️⃣', '七', 'seven', 7),
('numbers', '8️⃣', '八', 'eight', 8),
('numbers', '9️⃣', '九', 'nine', 9),
('numbers', '🔟', '十', 'ten', 10),
('numbers', '🥇', '第一', 'first', 11),
('numbers', '🥈', '第二', 'second', 12),
('numbers', '🥉', '第三', 'third', 13),
('numbers', '📏', '数数', 'count', 14),
('numbers', '➕', '加', 'plus', 15),
('numbers', '➖', '减', 'minus', 16);

-- Verify data counts
SELECT 'Database initialized successfully!' as message;
SELECT COUNT(*) as category_count FROM categories;
SELECT COUNT(*) as word_count FROM words;
