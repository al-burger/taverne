import { defineStore } from "pinia";
import { Player, Campaign } from "../../types/appTypes";
import { getClasses } from "../../API/classes";
import { getRaces } from "../../API/races";
import { getAuth } from "firebase/auth";
import {
  setDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// @ts-ignore
import { db, app } from "../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

 // Initialize Cloud Storage and get a reference to the service
 export const storage = getStorage(app);

export const usePlayerStore = defineStore("player", {
  state: () => ({
    _classes: [] as string[],
    _races: [] as string[],
    _campaign: {} as Campaign,
    _campaignsList: [] as Campaign[],
  }),
  actions: {
    setCampaignName(campaignName: string) {
      this._campaign.name = campaignName;
    },
    setCampaignPicture(campaignPicture: File) {
      this._campaign.picture = campaignPicture;
    },
    setGame(game: string) {
      this._campaign.game = game;
    },
    addPlayer(player: string) {
      if (!this._campaign.players) this._campaign.players = []
      this._campaign.players.push({
        name: player,
        race: "",
        class: "",
        level: 1,
      } as Player);
    },
    removePlayer(index: number) {
      this._campaign.players.splice(index, 1);
    },
    setCampaign(campaign: Campaign) {
      this._campaign = campaign;
      console.log(campaign);
    },
    async createCampaign(): Promise<void> {
      try {
        const user = getAuth().currentUser;
        if (!user) {
          throw new Error("L'utilisateur n'est pas connecté.");
        }
    
        const userId = user.uid;
        const simplifiedName = this.simplifyString(this._campaign.name);
        const picture = this._campaign.picture;
    
        // Préparez les données de la campagne
        const campaignData: Campaign = {
          players: this._campaign.players,
          name: this._campaign.name,
          game: this._campaign.game,
          uid: userId,
          imageURL: '',
          scenarios: [],
          id: '',
        };
    
        // Définissez la référence de stockage
        const storageRef = ref(storage, `campaign_images/${simplifiedName}.jpeg`);
    
        // Téléchargez le Blob dans Firebase Storage
        await uploadBytes(storageRef, picture as Blob);
        
        // Obtenez l'URL de téléchargement
        campaignData.imageURL = await getDownloadURL(storageRef);
    
        // Enregistrez les données de la campagne dans Firestore
        const docRef = collection(db, "campaigns");
        const newDocRef = await addDoc(docRef, campaignData);
        const docRefToUpdate = doc(db, 'campaigns', newDocRef.id);
        const newData = {
          id: newDocRef.id,
        };
        await updateDoc(docRefToUpdate, newData);
    
        // Définissez la campagne active
        this.setCampaign({...campaignData, id: newDocRef.id});
      } catch (error) {
        console.error('Erreur lors de la création de la campagne:', error);
      }
    },
    async getCampaignByUser(): Promise<void> {
      try {
        const user = await getAuth().currentUser;
        const userId = user?.uid;
        const q = query(
          collection(db, "campaigns"),
          where("uid", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        this._campaignsList = [];
        querySnapshot.forEach((doc) => {
          const campaign = doc.data() as Campaign;
          this._campaignsList.push(campaign);
        });
      } catch (err) {
        throw err;
      }
    },
    async deleteCampaign(campaign: any): Promise<void> {
      try {
        const simplifiedName = this.simplifyString(campaign.name);
        await deleteDoc(doc(db, "campaigns", simplifiedName));
        // Supprimez également la campagne de la liste locale
        const index = this._campaignsList.findIndex(
          (c) => c.uid === campaign.uid
        );
        if (index !== -1) {
          this._campaignsList.splice(index, 1);
        }
      } catch (err) {
        console.error("Erreur lors de la suppression de la campagne : ", err);
      }
    },
    async fetchClasses(): Promise<void> {
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
    async fetchRaces(): Promise<void> {
      try {
        const response = await getRaces();
        // Récupère les données des classes depuis la réponse
        const races = response.data.results.map((item: any) => item.name);
        // Met à jour l'état du store avec les classes
        this._races = races;
      } catch (error) {
        console.error("Erreur lors de la récupération des classes:", error);
      }
    },
    async updateCampaign(): Promise<void> {
      try {
        const updatedCampaign = this._campaign;
        const campaignRef = doc(db, "campaigns", updatedCampaign.id);
        await setDoc(campaignRef, updatedCampaign)
      } catch (err) {
        console.error("Erreur lors de la mise à jour de la campagne : ", err);
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
    campaignName: (state) => state._campaign.name,
    players: (state) => state._campaign.players,
    campaigns: (state) => state._campaignsList,
  },
});
