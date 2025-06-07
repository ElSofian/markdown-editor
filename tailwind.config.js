/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1F1F1F",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            code: {
              backgroundColor: "var(--tw-prose-pre-bg)",
              borderRadius: "0.25rem",
              paddingTop: "0.125rem",
              paddingRight: "0.25rem",
              paddingBottom: "0.125rem",
              paddingLeft: "0.25rem",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
}
