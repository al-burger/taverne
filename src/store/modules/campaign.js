import { defineStore } from "pinia";

export const useCampaignStore = defineStore('campaign', {
    state: () => ({
        campaigns: [],
    }),
    actions: {
        // Ajoute ici des actions pour gérer les campagnes
    }
});