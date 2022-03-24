module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '55': '55%',
        '93': '93%',
        '227': '227px',
        '195': '195px',
        '282': '282px',
        'formTitle':'535px',
        'form': '588px'
      },
      minWidth: {
        '282': '282px',
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
        'private-investors': '#68A532',
        'light-accent-green' : '#95E257',
        "research-card-preview": "#161616",
        "research-precision-container": "#353434",
        "input-background": "#242424",
        "dark-text-action":"#8585F6"
      },
      borderWidth: {
        "3": "3px",

      },
      scale:{
        '115':"1.15",
        '120':"1.20",
      },
      plugins: [],
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      opacity: ["group-hover"]
    },
  },
}