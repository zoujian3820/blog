import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/viewwindow.css'
import '@/assets/css/reset.scss'

// 引入element-plus样式
import 'element-plus/dist/index.css'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

createApp(App).use(router).use(ElementPlus, { locale: zhCn }).mount('#app')
