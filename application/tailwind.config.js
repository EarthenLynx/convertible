module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    textColor: theme => ({
      ...theme('colors'),
      primary: '#4693c8',
      secondary: '#9e4d90',
      'dark-primary': '#22303C',
      'dark-secondary': '#fefefe',
      'dark-accent': '#8899A6'
    }),

    backgroundColor: theme => ({
      ...theme('colors'),
      primary: '#4693c8',
      secondary: '#9e4d90',
      dark: '#15202b',
      'dark-primary': '#22303C',
      'dark-secondary': '#fefefe',
      'dark-accent': '#8899A6'
    }),

    borderColor: theme => ({
      ...theme('colors'),
      primary: '#4693c8',
      secondary: '#9e4d90',
      'dark-primary': '#22303C',
      'dark-secondary': '#fefefe',
      'dark-accent': '#8899A6'
    }),

    gradientColorStops: theme => ({
      ...theme('colors'),
      primary: '#4693c8',
      secondary: '#9e4d90',
    }),

    boxShadow: {
      'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      'primary': '0 0 2px 3px rgba(70,147,200,0.45)',
      'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      'none': 'none',
    },
  },
  variants: {},
  plugins: [],
}
