module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,}'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    },
    extend: {
      width: {
        55: '55%',
        93: '93%',
        120: '120px',
        227: '227px',
        195: '195px',
        282: '282px',
        formTitle: '535px',
        form: '588px',
        headerSize: '1240px'
      },
      minWidth: {
        282: '282px'
      },
      maxWidth: {
        headerSize: '1240px',
        cardsListContainer: '1120px',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%'
      },
      height: {
        55: '55%',
        93: '93%',
        204: '204px',
        172: '172px',
        181: '181px',
        form: '301px'
      },
      colors: {
        //
        // Delete petit à petit
        //

        // 'blue-france': '#000091',
        'blue-france-main': '#6A6AF4',
        'blue-france-main-hover': '#a0a0f8',
        'research-card-preview': '#161616',
        'research-precision-container': '#353434',
        'input-background': '#242424',
        'dark-text-action': '#8585F6',
        'background-form': '#1F1F1F',
        'background-inputs': '#242424',
        beta: '#019D78',
        investisseurs: '#68A532',
        'acheteurs-publics': '#F95C5E',
        'aides-innovations': '#D8C635',
        transparent: 'transparent',
        current: 'currentColor',

        ///

        // Use dsfr colors : https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-identite-de-l-etat/couleurs-palette/
        'blue-france': {
          'main-525': { DEFAULT: '#6a6af4', hover: '#9898f8', active: '#aeaef9' },
          'sun-113': { DEFAULT: '#000091', hover: '#1212ff', active: '#2323ff' },
          625: {
            DEFAULT: '#8585F6',
            hover: '#b1b1f9',
            active: '#c6c6fb',
            lightBackground: '#8585F6'
          }
        },

        grey: {
          50: { DEFAULT: '#161616', hover: '#343434', active: '#474747' },
          75: { DEFAULT: '#161616', hover: '#3f3f3f', active: '#525252' },
          100: { DEFAULT: '#1E1E1E', hover: '#474747', active: '#5b5b5b' },
          625: { DEFAULT: '#929292', hover: '#bbbbbb', active: '#cecece' }
        },

        // Investisseurs
        'green-bourgeon': {
          'main-640': { DEFAULT: '#68A532', hover: '#87d443', active: '#95e94a' }
        },

        // Acheteurs publics
        'red-marianne': {
          625: {
            DEFAULT: '#f95c5e',
            hover: '#fa9293',
            active: '#fbabac',
            lightBackground: '#2D0405'
          }
        },

        // Startup
        'green-menthe-moon': {
          652: {
            DEFAULT: '#4EC8AE',
            hover: '#4EC8AE',
            active: '#4EC8AE',
            lightBackground: '#1A2624',
            text: '#4EC8AE'
          }
        },

        // Achats public à venir
        'green-tilleul-verveine': {
          100: {
            DEFAULT: '#272419',
            hover: '#4c4734',
            active: '#615b44',
            lightBackground: '#272419',
            text: '#D8C635'
          }
        }

        // 'research-precision-container': '#353434',
        // 'background-form': '#1F1F1F',
        // beta: '#019D78'
      },
      borderWidth: {
        3: '3px'
      },
      scale: {
        115: '1.15',
        120: '1.20'
      },
      screens: {
        'dsfr-lg': '992px',
        'desktop-L': '1920px',
        '2XL': '1680px',
        'desktop-XL': '2200px'
      },
      boxShadow: {
        header: '0px 16px 16px -16px rgba(0, 0, 0, 0.32), 0px 8px 16px rgba(0, 0, 0, 0.1)'
      },
      plugins: []
    }
  },
  variants: {
    extend: {
      display: ['group-hover'],
      opacity: ['group-hover'],
      active: ['group-active']
    }
  }
};
