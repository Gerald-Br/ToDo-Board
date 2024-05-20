import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.css'


const app = createApp(App)

app.use(router)

app.mount('#app')
