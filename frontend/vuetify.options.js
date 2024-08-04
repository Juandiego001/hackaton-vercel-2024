import colors from 'vuetify/es5/util/colors'

export default function ({ app }) {
  return {
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#170743',
          secondary: '#562496',
          accent: '#B7C6E3',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: '#E57373',
          success: colors.green.darken3,
          persian: '#2A9D8F',
          saffron: '#E9C46A',
          burnt: '#E76F51',
          purple: '#2B0F6B'
        }
      }
    },
    icons: {
      iconfont: 'mdi'
    }
  }
}
