/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      backgroundImage: {
        userBoardEmojiBackground: "url('/src/assets/userEmoji.svg')",
      },
      fontFamily: {
        suit: ['SUIT Variable'],
      },
    },
  },
  plugins: [],
};
