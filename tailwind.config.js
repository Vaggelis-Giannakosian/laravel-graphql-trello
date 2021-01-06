const colors = require('tailwindcss/colors')

module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.js',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            boxShadow: {
                card: '0 1px 0 rgba(9,30,66,.25)'
            },
            colors: {
                teal: colors.teal,
                orange: colors.orange,
            }
        },

    },
    variants: {
        extend: {
            opacity:['group-hover','hover','disabled']
        },
    },
    plugins: [],
}
