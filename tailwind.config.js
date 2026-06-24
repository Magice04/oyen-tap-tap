/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fff8ef",
        biscuit: "#f8ead8",
        paw: "#f97316",
        pawSoft: "#fed7aa",
        mint: "#86efac",
        skySoft: "#dbeafe",
        catgram: "#8b5cf6",
        ink: "#3b2a20",
      },
      boxShadow: {
        soft: "0 16px 40px rgba(114, 77, 46, 0.12)",
        card: "0 10px 24px rgba(114, 77, 46, 0.10)",
      },
      borderRadius: {
        '4xl': "2rem",
      },
    },
  },
  plugins: [],
}
