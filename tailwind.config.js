module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,}',
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '55': '55%',
        '93': '93%',
        '120' : '120px',
        '227': '227px',
        '195': '195px',
        '282': '282px',
        'formTitle':'535px',
        'form': '588px',

      },
      minWidth: {
        '282': '282px',
      },
      maxWidth: {
        'headerSize': '1240px',
      },
      height: {
        '55': '55%',
        '93': '93%',
        '204': '204px',
        '172': '172px',
        '181': '181px', 
        'form': '301px'
      },
      colors: {
        'blue-france': '#000091',
        'blue-france-main': '#6A6AF4',
        "research-card-preview": '#161616',
        "research-precision-container": '#353434',
        "input-background": '#242424',
        "dark-text-action":'#8585F6',
        "background-form" : '#1F1F1F',
        "background-inputs" :'#242424',
        "beta": "#019D78",
        "investisseurs": "#68A532",
        "acheteurs-publics":"#F95C5E",
        "aides-innovations":"#D8C635",

      },
      borderWidth: {
        "3": "3px",
      },
      scale:{
        '115':"1.15",
        '120':"1.20",
      },
      screens: {
        'desktop-L': '1920px',
        '2XL': '1680px',
        'desktop-XL': '2200px',
      },
      plugins: [],
    },
    
  },
  variants: {
    extend: {
      display: ["group-hover"],
      opacity: ["group-hover"],
      active:  ["group-active"]
    },
  },
}