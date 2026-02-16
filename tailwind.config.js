/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主题色系 - 贴近自然和主题
        theme: {
          // 动物 - 暖棕色/大地色
          animal: '#D2691E',
          'animal-light': '#F4A460',
          // 水果 - 清新绿色
          fruit: '#4CAF50',
          'fruit-light': '#8BC34A',
          // 颜色形状 - 彩虹色
          color: '#FF6B6B',
          'color-light': '#FFE66D',
          // 交通 - 天蓝色
          transport: '#64B5F6',
          'transport-light': '#90CAF9',
          // 家庭 - 温馨粉红
          family: '#FF8A80',
          'family-light': '#FFAB91',
          // 身体 - 健康粉色
          body: '#F48FB1',
          'body-light': '#F8BBD9',
          // 日常 - 温暖橙色
          daily: '#FFB74D',
          'daily-light': '#FFCC80',
          // 自然 - 森林绿
          nature: '#66BB6A',
          'nature-light': '#A5D6A7',
          // 数字 - 蓝紫色（学习/智慧色）
          number: '#7E57C2',
          'number-light': '#B39DDB',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'card': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'button': '0 8px 25px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        'cute': ['Comic Sans MS', 'cursive', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'star-fly': 'starFly 1s forwards',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-10deg)' },
          '75%': { transform: 'rotate(10deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        starFly: {
          '0%': { opacity: '1', transform: 'scale(0) rotate(0deg)' },
          '100%': { opacity: '0', transform: 'scale(1.5) rotate(360deg) translateY(-100px)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
