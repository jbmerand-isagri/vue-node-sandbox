import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp, h } from 'vue'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

// Components
import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './graphql/apollo-client'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light'
  },
  components,
  directives
})

const app = createApp({
  render: () => h(App)
})

app.use(createPinia())
app.use(vuetify)
app.use(router)
app.provide(DefaultApolloClient, apolloClient) // Provide Apollo Client to the app

app.mount('#app')
