import { defineStore } from "pinia";
import axios from "axios"; // Assure-toi d'importer Axios
import { Player } from "../../types/appTypes";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    players: [] as Player[],
    campaignName: '' as string,
    classes: [] as string[],
    races: [] as string[],
  }),
  actions: {
    createCampaignName(campaignName: string) {
      this.campaignName = campaignName;
    },
    createPlayers(players: string[]) {
      this.players = players.map((player) => {
        return {
          name: player,
          race: "",
          class: "",
          level: 0,
        };
      });
    },
    async fetchClasses() {
      try {
        const response = await axios.get("https://www.dnd5eapi.co/api/classes");
        // Récupère les données des classes depuis la réponse
        const classes = response.data.results.map((item: any) => item.name);
        // Met à jour l'état du store avec les classes
        this.classes = classes;
      } catch (error) {
        console.error("Erreur lors de la récupération des classes:", error);
      }
    },
    async fetchRaces() {
      try {
        const response = await axios.get("https://www.dnd5eapi.co/api/races");
        // Récupère les données des classes depuis la réponse
        const races = response.data.results.map((item: any) => item.name);
        // Met à jour l'état du store avec les classes
        this.races = races;
      } catch (error) {
        console.error("Erreur lors de la récupération des classes:", error);
      }
    },
  },
  getters: {
    isRaceAnOrc({ players }) {
      return players.find((player) => player.race === 'orc');
    },
    campaignName(state) {
      return state.campaignName;
    }
  }
});
