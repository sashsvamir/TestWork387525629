import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css"
import "../node_modules/@fortawesome/fontawesome-free/css/regular.css"
import "../node_modules/@fortawesome/fontawesome-free/css/solid.css"

import './utils/alerts'

import App from '@/App.vue'
import router from '@/router'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
