
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './aromio/router/router'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

createApp(App).use(router).use(pinia).mount('#app')
