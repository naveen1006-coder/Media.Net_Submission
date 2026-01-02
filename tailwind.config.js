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
                    DEFAULT: '#a78bfa', // violet-400
                    300: '#c4b5fd', // violet-300
                    400: '#a78bfa', // violet-400
                    500: '#8b5cf6', // violet-500 (standard backup)
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
