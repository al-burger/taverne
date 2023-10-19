import { defineStore } from "pinia";
import axios from "axios";
import { Player, Campaign } from "../../types/appTypes";
import { getClasses } from "../../API/classes";
import { getAuth } from "firebase/auth";
import {
  setDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// @ts-ignore
import { db, app } from "../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

 // Initialize Cloud Storage and get a reference to the service
 export const storage = getStorage(app);

export const usePlayerStore = defineStore("player", {
  state: () => ({
    _players: [] as Player[],
    _campaignName: "" as string,
    _campaignPicture: "" as string,
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
    createCampaignPicture(campaignPicture: string) {
      this._campaignPicture = campaignPicture;
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
    setActiveCampaign(campaign: Campaign) {
      this._campaign = campaign;
    },
    async createCampaign(players: any, imgURL: any) {
      const user = getAuth().currentUser;
      const userId = user?.uid;
      const simplifiedName = this.simplifyString(this._campaignName);
    
      const campaignData = {
        players: players,
        name: this._campaignName,
        game: this._game,
        uid: userId,
        imageURL: "",
      } as Campaign;
    
      // Spécifiez le chemin vers le fichier image dans vos ressources statiques
      const imagePath = '/src/assets/refuge.jpeg';
    
      // Lisez le contenu du fichier image
      try {
        const response = await fetch(imagePath);
        const imageBlob = await response.blob(); // Créez un Blob à partir du contenu du fichier
    
        // Téléchargez le Blob dans Firebase Storage
        const storageRef = ref(storage, `campaign_images/${simplifiedName}.jpeg`);
        await uploadBytes(storageRef, imageBlob);
    
        // Récupérez l'URL de téléchargement
        const imageURL = await getDownloadURL(storageRef);
    
        campaignData.imageURL = imageURL; // Mettez à jour l'URL de l'image
    
        // Enregistrez les données de la campagne dans Firestore (avec l'URL de l'image si présente)
        await setDoc(doc(db, "campaigns", simplifiedName), campaignData);
    
        this.setActiveCampaign(campaignData);
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image:', error);
      }
    },
    async getCampaignByUser() {
      try {
        const user = await getAuth().currentUser;
        const userId = user?.uid;
        const q = query(
          collection(db, "campaigns"),
          where("uid", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        this._allCampaigns = [];
        querySnapshot.forEach((doc) => {
          const campaign = doc.data() as Campaign;
          this._allCampaigns.push(campaign);
        });
      } catch (err) {
        throw err;
      }
    },
    async deleteCampaign(campaign: any) {
      try {
        const simplifiedName = this.simplifyString(campaign.name);
        await deleteDoc(doc(db, "campaigns", simplifiedName));
        // Supprimez également la campagne de la liste locale
        const index = this._allCampaigns.findIndex(
          (c) => c.uid === campaign.uid
        );
        if (index !== -1) {
          this._allCampaigns.splice(index, 1);
        }
      } catch (err) {
        console.error("Erreur lors de la suppression de la campagne : ", err);
      }
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
    simplifyString(str: string) {
      return str
        .normalize("NFD") // Supprime les accents
        .replace(/[\u0300-\u036f\s]/g, "") // Supprime les accents et les espaces
        .toLowerCase(); // Convertit en minuscules
    },
  },
  getters: {
    campaignName: (state) => state._campaignName,
    players: (state) => state._players,
    campaigns: (state) => state._allCampaigns,
  },
});
