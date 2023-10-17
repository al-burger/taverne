import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const pinia = createPinia();

pinia.use(piniaPluginPersistedstate)

// Exporte une fonction pour initialiser le store
export function setupStore() {
  // ...
}