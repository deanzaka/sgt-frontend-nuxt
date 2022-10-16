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
          primary: '#8431e7',
          secondary: '#3F51B5',
          info: '#26A69A',
          warning: '#FFC107',
          error: '#D50000',
          success: '#00E676',
        },
      },
    },
  })
  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
