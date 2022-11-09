import Vue from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default (ctx) => {
  const vuetify = new Vuetify({
    treeShake: true,
    options: {
      customProperties: true,
    },
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#5C6BC0',
          secondary: '#64B5F6',
          info: '#26A69A',
          warning: '#FFC107',
          error: '#D50000',
          success: '#00E676',
        },
        dark: {
          primary: '#26418F',
          secondary: '#2286C3',
          info: '#26A69A',
          warning: '#FFC107',
          error: '#D50000',
          success: '#00E676',
        }
      },
    },
  })
  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
