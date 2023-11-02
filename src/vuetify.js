// Vuetify
import "./style/main.scss";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";

const myCustomTheme = {
    dark: false,
    colors: {
        background: "#fae9d9",
        surface: "#F8D5B5",
        primary: "#D32430",
        "primary-darken-1": "#3700B3",
        secondary: "#582D30",
        "secondary-darken-1": "#018786",
        error: "#B00020",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00",
        card: "#ffeacf",
    },
    // Définissez la police Poppins comme police par défaut
    defaultFont: "Poppins, sans-serif",
    font: {
        family: "Poppins, sans-serif",
    },
};

export function setupVuetify() {
    return createVuetify({
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
          font: {
            family: "Poppins, sans-serif",
          },
        },
        options: {
          customProperties: true,
        },
        font: {
          family: "Poppins, sans-serif",
        },
      },
    });
  }
