import { defineStore } from "pinia";
import axios from "axios";
import { Player, Campaign } from "../../types/appTypes";
import { getClasses } from "../../API/classes";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    _players: [] as Player[],
    _campaignName: "" as string,
    _classes: [] as string[],
    _races: [] as string[],
    _game: "" as string,
    _campaign: {} as Campaign,
    _allCampaigns: [] as Campaign[],
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
    async createCampaign(players: any) {
      // Supposez que user est l'utilisateur authentifié
      const user = getAuth().currentUser;

      if (user) {
        // Récupérez l'ID utilisateur unique
        const userId = user.uid;

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "campaigns"), {
          players: players,
          name: this._campaignName,
          game: this._game,
          uid: userId,
        });
        console.log("Document written with ID: ", docRef);
      }
    },
    async getCampaignByUser() {
      const user = getAuth().currentUser;
      const q = query(collection(db, "campaigns"), where("uid", "==", user?.uid));
      const querySnapshot = await getDocs(q);
      this._allCampaigns = [];
      querySnapshot.forEach((doc) => {
        const campaign = doc.data() as Campaign;
        this._allCampaigns.push(campaign);
      });
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
    campaigns: (state) => state._allCampaigns,
  },
});
