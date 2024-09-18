import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

// Components
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light'
  },
  components,
  directives
})

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')
