/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Mercury · Venus · Earth · Mars · Jupiter · Saturn · Uranus · Neptune.
      animation: {
        "sun-rotate": "spin 4s linear infinite",
        "mercury-axis": "spin 12s linear infinite",
        "mercury-rotate": "spin 4s linear infinite",
        "venus-axis": "spin 8s linear infinite",
        "venus-rotate": "spin 5s linear infinite",
        "earth-axis": "spin 9s linear infinite",
        "earth-rotate": "spin 5s linear infinite",
        "mars-axis": "spin 10s linear infinite",
        "mars-rotate": "spin 5s linear infinite",
        "jupiter-axis": "spin 11s linear infinite",
        "jupiter-rotate": "spin 5s linear infinite",
        "saturn-axis": "spin 12s linear infinite",
        "saturn-rotate": "spin 5s linear infinite",
        "uranus-axis": "spin 13s linear infinite",
        "uranus-rotate": "spin 5s linear infinite",
        "neptune-axis": "spin 14s linear infinite",
        "neptune-rotate": "spin 5s linear infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
