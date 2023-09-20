import { defineStore } from "pinia";
import axios from "axios"; // Assure-toi d'importer Axios

export const usePlayerStore = defineStore("player", {
    state: () => ({
        players: [],
        classes: [],
        races: [],
    }),
    actions: {
        async createPlayers(players) {
            this.players = players.map((player) => {
                return {
                    name: player,
                    races: '',
                    classes: '',
                    level: '',
                };
            });
        },
        async fetchClasses() {
            try {
                const response = await axios.get(
                    "https://www.dnd5eapi.co/api/classes"
                );
                // Récupère les données des classes depuis la réponse
                const classes = response.data.results.map((item) => item.name);
                // Met à jour l'état du store avec les classes
                this.classes = classes;
            } catch (error) {
                console.error("Erreur lors de la récupération des classes:", error);
            }
        },
        async fetchRaces() {
            try {
                const response = await axios.get(
                    "https://www.dnd5eapi.co/api/races"
                );
                // Récupère les données des classes depuis la réponse
                const races = response.data.results.map((item) => item.name);
                // Met à jour l'état du store avec les classes
                this.races = races;
            } catch (error) {
                console.error("Erreur lors de la récupération des classes:", error);
            }
        },
    },
});