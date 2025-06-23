import type { Config } from "tailwindcss";

export default {
    darkMode: 'class',
    content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Nunito", "sans-serif"]
    },
    extend: {
      colors: {
        background: "#212121",
        primary: "#1660ea",
        accent: "#55a7f3",
        muted: "#404040",
        subtle: "#2d3c45",
        panel: "#292929",
        text: "#d5d7d8",
      },
    },
  },
  plugins: [],
} satisfies Config;
