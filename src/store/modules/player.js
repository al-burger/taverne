import { defineStore } from "pinia";

export const usePlayerStore = defineStore('campaign', {
    state: () => ({
        players: [],
    }),
    actions: {
        // Ajoute ici des actions pour gérer les joueurs
    }
});