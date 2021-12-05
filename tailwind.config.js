module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor:{
        'primary': '#161B22',
        'secondary': '#0D1117',
        'background': '#010409',
        'white': '#F5F5F1',
        'button' : '#2f1d64',
      },
      fontFamily: {
        'base' : 'Segoe UI',
     },
     borderColor:{
       'normal':'#30363D',
     },
     textColor:{
       'white' : '#F5F5F1',
       'link' : '#673AB7',
     }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
