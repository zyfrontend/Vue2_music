import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import '@/Element'
import 'normalize.css'
import { globalRegister } from '@/Element'
const app = createApp(App)
app.use(globalRegister)
app.use(store)
app.use(router)
app.mount('#app')
