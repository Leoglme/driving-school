import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import { Notyf } from 'notyf';

// styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import './assets/styles/index.css'
import 'notyf/notyf.min.css';

// Create an instance of Notyf
const notyf = new Notyf();

createApp(App)
    .use(router)
    .provide('notyf', notyf)
    .mount('#app')
