/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Cormorant Garamond', 'serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#4169E1', // royal blue
                    300: '#60a5fa', // blue-400
                    400: '#4169E1', // royal blue
                    500: '#3b82f6', // blue-500
                },
                violet: {
                    50: '#f5f3ff',  // Soft lavender background
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    900: '#4c1d95',
                }
            },
        },
    },
    plugins: [],
}
