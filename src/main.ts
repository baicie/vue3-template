import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { pinia } from './store'
import router from './routes'
const app = createApp(App)

app.use(ElementPlus)

app.use(pinia)

app.use(router)

app.mount('#app')
