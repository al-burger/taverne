import { createApp } from "vue";
import "./style/style.css";
import App from "./App.vue";
import router from "./router";
import { pinia, setupStore } from "./store";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
const myCustomTheme = {
  dark: false,
  colors: {
    background: "#f5f0e6",
    surface: "#f5f0e6",
    primary: "#49829f",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "myCustomTheme",
    themes: {
      myCustomTheme,
    },
  },
});

// Initialisation du store Pinia
setupStore();

createApp(App).use(vuetify).use(router).use(pinia).mount("#app");
