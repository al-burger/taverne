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
    _activeStepIndex: -1, // Index de la step active
  }),
  actions: {
    setScenarioToEdit(scenario: Scenario) {
      this._scenarioToEdit = scenario;
    },
    addStep(step: string) {
      const stepFormated = { name: step, pnj: [], monsters: [], items: [] };
      this._scenarioToEdit.steps.push(stepFormated);
    },
    setActiveStep(index: number) {
      this._activeStepIndex = index;
    },
    updateStep(stepIndex: any, updatedStep: any) {
      const scenarioToEdit = this._scenarioToEdit;
      scenarioToEdit.steps[stepIndex] = updatedStep;
    },
    addPnjToStep(stepIndex: any, pnj: any) {
      const scenarioToEdit = this._scenarioToEdit;

      if (stepIndex >= 0 && stepIndex < scenarioToEdit.steps.length) {
        scenarioToEdit.steps[stepIndex].pnj.push(pnj);
      }
    },

    // Ajouter un monstre à une étape du scénario actif
    addMonsterToStep(stepIndex: any, monster: any) {
      const scenarioToEdit = this._scenarioToEdit;

      if (stepIndex >= 0 && stepIndex < scenarioToEdit.steps.length) {
        scenarioToEdit.steps[stepIndex].monsters.push(monster);
      }
    },

    // Ajouter un objet à une étape du scénario actif
    addItemToStep(stepIndex: any, item: any) {
      const scenarioToEdit = this._scenarioToEdit;

      if (stepIndex >= 0 && stepIndex < scenarioToEdit.steps.length) {
        scenarioToEdit.steps[stepIndex].items.push(item);
      }
    },
    removeItemFromStep(stepIndex: any, index: any) {
      const scenarioToEdit = this._scenarioToEdit;

      if (stepIndex >= 0 && stepIndex < scenarioToEdit.steps.length) {
        scenarioToEdit.steps[stepIndex].items.splice(index, 1);
      }
    },
    removeMonsterFromStep(stepIndex: any, index: any) {
      const scenarioToEdit = this._scenarioToEdit;

      if (stepIndex >= 0 && stepIndex < scenarioToEdit.steps.length) {
        scenarioToEdit.steps[stepIndex].monsters.splice(index, 1);
      }
    },
    removeNpcFromStep(stepIndex: any, index: any) {
      const scenarioToEdit = this._scenarioToEdit;

      if (stepIndex >= 0 && stepIndex < scenarioToEdit.steps.length) {
        scenarioToEdit.steps[stepIndex].pnj.splice(index, 1);
      }
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
