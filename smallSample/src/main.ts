import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/viewwindow.css'
import '@/assets/css/reset.scss'
createApp(App).use(router).mount('#app')
