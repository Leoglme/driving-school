import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import { Notyf } from 'notyf';

// styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import './assets/styles/index.css'
import './assets/styles/full-calendar.scss'
import 'notyf/notyf.min.css';
import 'v-calendar/dist/style.css';

// Create an instance of Notyf
const notyf = new Notyf();

//progress bar
import { Vue3ProgressPlugin } from '@marcoschulte/vue3-progress';
import './assets/styles/progress-bar.scss'


//Pinia store
import { createPinia } from "pinia";

const pinia = createPinia()

//Vee-validate
import '@/plugins/vee-validate'

//v-calendar
import VCalendar, { DatePicker } from 'v-calendar';

createApp(App)
    .use(router)
    .use(VCalendar, {})
    .use(pinia)
    .component("v-date-picker", DatePicker)
    .use(Vue3ProgressPlugin)
    .provide('notyf', notyf)
    .mount('#app')
