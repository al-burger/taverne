// main.js
import { createApp } from "vue";
import "./style/style.css";
import App from "./App.vue";
import router from "./router";
import { pinia, setupStore } from "./store";
import { setupVuetify } from "./vuetify";
import "./firebase";

// Initialisation du store Pinia
setupStore();

const app = createApp(App);

// Configuration de Vuetify
const vuetify = setupVuetify();

// Montage de l'application
app
  .use(vuetify)
  .use(router)
  .use(pinia)
  .mount("#app");
