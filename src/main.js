import { createApp } from 'vue'
import '../dist/output.css'
import App from './App.vue'
import router from './router';
import { pinia, setupStore } from './store';

// Initialisation du store Pinia
setupStore();

createApp(App).use(router).use(pinia).mount('#app')
