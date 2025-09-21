import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [scrollbarHide],
} satisfies Config;