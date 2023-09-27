import { defineStore } from "pinia";
import axios from "axios";
import { Player, Campaign } from "../../types/appTypes";
import { getClasses } from "../../API/classes";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    _players: [] as Player[], 
    _campaignName: "" as string,
    _classes: [] as string[],
    _races: [] as string[],
    _game: "" as string,
    _campaign: {} as Campaign,
    _allCampaigns: [
      {
        name: "campaign de test",
        game: "donjon & dragons",
        players: [
          {
            name: "alex",
            level: 1,
            race: "string",
            class: "string",
          },
          {
            name: "pierre",
            level: 1,
            race: "string",
            class: "string",
          },
        ],
      },
      {
        name: "campaignTest",
        game: "donjon & dragons",
        players: [
          {
            name: "Player 1",
            level: 1,
            race: "string",
            class: "string",
          },
          {
            name: "Player 2",
            level: 1,
            race: "string",
            class: "string",
          },
        ],
      },
    ] as Campaign[],
  }),
  actions: {
    createCampaignName(newCampaignName: string) {
      this._campaignName = newCampaignName;
    },
    addPlayers(player: string) {
      const pl = { name: player, race: "", class: "", level: 1 };
      this._players.push(pl);
    },
    removePlayer(index: number) {
      this._players.splice(index, 1);
    },
    setGame(game: string) {
      this._game = game;
    },
    createCampaign(players: any) {
      this._campaign = {
        players: players,
        name: this._campaignName,
        game: this._game,
      };
    },
    getCampaignByName(name: string) {
      const currentCampaign = this._allCampaigns.find(
        (campaign: Campaign) => campaign.name === name
      );
      this._campaign = currentCampaign || { name: "", players: [], game: "" };
    },
    async fetchClasses() {
      try {
        const response = await getClasses();
        // Récupère les données des classes depuis la réponse
        const classes = response.data.results.map((item: any) => item.name);
        // Met à jour l'état du store avec les classes
        this._classes = classes;
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
        this._races = races;
      } catch (error) {
        console.error("Erreur lors de la récupération des classes:", error);
      }
    },
  },
  getters: {
    campaignName: (state) => state._campaignName,
    players: (state) => state._players,
    campaigns: (state) => state._allCampaigns
  },
});
