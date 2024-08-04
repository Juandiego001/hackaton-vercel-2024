import colors from 'vuetify/es5/util/colors'

export default function ({ app }) {
  return {
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#240046',
          secondary: '#10002B',
          persian: '#3C096C',
          tekhelet: '#5A189A',
          french: '#7B2CBF',
          amethyst: '#9D4EDD',
          heliotrope: '#C77DFF',
          mauve: '#E0AAFF',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: '#E57373',
          success: colors.green.darken3
        }
      }
    },
    icons: {
      iconfont: 'mdi'
    }
  }
}
