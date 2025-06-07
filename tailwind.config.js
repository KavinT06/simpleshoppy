/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            animation: {
                'fade-in-out': 'fadeInOut 3s ease-in-out',
            },
        },
    },
    plugins: [],
}