import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'

// styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import './assets/styles/index.css'
createApp(App)
    .use(router)
    .mount('#app')
