/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)", 
        secondary: "var(--secondary-color)", 
        tertiary: "var(--tertiary-color)", 
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textTertiary: "var(--text-tertiary)",
        green: {
          100: "#1FCB4F"
        },
        yellow: {
          100: "#FFC01E"
        },
        gray: {
          800: '#383838',
        },
        red: {
          500: "#F44336"
        }
      },
    },
  },
  plugins: [],
}

