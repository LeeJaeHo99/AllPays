/** @type {import('tailwindcss').Config} */

export default {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'ns-bold': ['ns-bold', 'sans-serif'],
                'ns-regular': ['ns-regular', 'sans-serif'],
                'ns-light': ['ns-light', 'sans-serif'],
            },
            colors: {
                'primary': '#0649ed',
                'red': '#ED0649',
                'white': '#fefeff',
                'gray': '#8f9296',
            },
        },
    },
    plugins: [],
};