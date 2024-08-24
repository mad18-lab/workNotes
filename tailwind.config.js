module.exports = {
    theme: {
        extend: {
            backgroundImage: {
                'hero-pattern': "url('./bg.jpg')",
            },

            fontFamily: {
                'Playwrite': "Playwrite CL", cursive,
            },

            keyframes: {
                fadeInLeft: {
                  '0%': { opacity: 0, transform: 'translateX(-100%)' },
                  '100%': { opacity: 1, transform: 'translateX(0)' },
                },
            },
            animation: {
                'fade-in-left': 'fadeInLeft 1s ease-out forwards',
            },
        }
    }
}