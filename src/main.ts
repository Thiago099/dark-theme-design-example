import { createApp } from 'vue'
import App from './App.vue'
import router from './global/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './global/main.css'
import components from './global/components'

createApp(App)
    .use(router)
    .mixin(components)
    .mount('#app')
