import { defineStore } from "pinia";
import { Scenario } from "../../types/appTypes";
import { getMonsters, getMonsterStats } from "../../API/monsters";
import { getItems, getItemStats } from "../../API/items";

export const useScenarioStore = defineStore("scenario", {
  state: () => ({
    _scenarios: [
      {
        name: "Enquête dans les profondeurs",
        steps: [
          {
            name: "La Mine de Khazadur",
            pnj: [{ name: "Thrain Barbe-de-Fer" }, { name: "Dernoc le Sage" }],
            monsters: [],
            items: [],
          },
          {
            name: "Les Secrets Enfouis",
            pnj: [{ name: "Gralk le Colosse" }],
            monsters: [],
            items: [],
          },
          {
            name: "La Pierre de la Malédiction",
            pnj: [],
            monsters: [],
            items: [],
          },
        ],
      },
      { name: "scenario 2" },
      { name: "scenario 3" },
      { name: "scenario 4" },
    ] as Scenario[],
    _scenarioToEdit: {} as Scenario,
    _monsters: [] as string[],
    _monsterStats: {},
    _items: [],
  }),
  actions: {
    setScenarioToEdit(scenario: Scenario) {
      this._scenarioToEdit = scenario;
    },
    async fetchMonsters() {
      try {
        const response = await getMonsters();
        this._monsters = response.data.results;
      } catch (error) {
        console.error("Erreur lors de la récupération des monstres:", error);
      }
    },
    async fetchMonsterStats(monster: string) {
      try {
        const response = await getMonsterStats(monster);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des monstres:", error);
      }
    },
    async fetchItems() {
      try {
        const response = await getItems();
        this._items = response.data.results;
      } catch (error) {
        console.error("Erreur lors de la récupération des monstres:", error);
      }
    },
    async fetchItemStats(item: string) {
      try {
        const response = await getItemStats(item);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des monstres:", error);
      }
    },
  },
  getters: {},
  // persist: true,
});
