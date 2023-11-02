import { defineStore } from "pinia";
import { Scenario, Step, Npc, Monster } from "../../types/appTypes";
import { getMonsters, getMonsterStats } from "../../API/monsters";
import { getItems, getItemStats } from "../../API/items";
import { usePlayerStore } from "./player";

export const useScenarioStore = defineStore("scenario", {
  state: () => ({
    _scenarios: [] as Scenario[],
    _scenarioToEdit: {} as Scenario,
    _monsters: [] as string[],
    _monsterStats: {} as Record<string, any>,
    _items: [] as string[],
    _activeStepIndex: -1,
    _timelineItems: [
      {
        icon: "mdi-star",
        title: "Rencontre de Thrain",
        description:
          "Les aventuriers rencontrent Thrain dans le hall principal de la cité naine de Khazadur dès leur arrivée. Il est chargé de présenter la situation et de solliciter leur aide.",
      },
      {
        icon: "mdi-star",
        title: "Préservation de l'histoire naine",
        description:
          "Les aventuriers peuvent trouver Dernoc dans la bibliothèque des Anciennes Légendes de Khazadur, où il étudie d'anciens manuscrits. Il peut leur fournir des informations sur l'histoire de la mine.",
      },
      {
        icon: "mdi-star",
        title: "En route vers la forge",
        description:
          "Mira tient sa forge dans la cité naine et offre ses services aux aventuriers. Elle peut forger des équipements ou objets magiques en échange de leur aide pour sécuriser la mine.",
      },
    ],
  }),
  actions: {
    addScenario(scenario: Scenario) {
      this._scenarios.push(scenario);
    },
    setScenarios() {
      const playerStore = usePlayerStore();
      this._scenarios = playerStore._campaign.scenarios;
    },
    setScenarioToEdit(scenario: Scenario) {
      this._scenarioToEdit = scenario;
    },
    addStep(step: string) {
      const stepFormated: Step = {
        name: step,
        npc: [],
        monsters: [],
        items: [],
      };
      this._scenarioToEdit.steps.push(stepFormated);
    },
    setActiveStep(index: number) {
      this._activeStepIndex = index;
    },
    updateStep(stepIndex: number, updatedStep: Step) {
      const scenarioToEdit = this._scenarioToEdit;
      if (stepIndex >= 0 && stepIndex < scenarioToEdit.steps.length) {
        scenarioToEdit.steps[stepIndex] = updatedStep;
      }
    },
    addNpcToStep(npc: Npc) {
      const currentStep = this._scenarioToEdit.steps[this._activeStepIndex];
      if (!currentStep.npc) {
        currentStep.npc = [];
      }
      currentStep.npc.push(npc);
    },
    addMonsterToStep(monster: Monster[]) {
      const currentStep = this._scenarioToEdit.steps[this._activeStepIndex];
      currentStep.monsters.push(...monster);
    },
    addItemToStep(item: string[]) {
      const currentStep = this._scenarioToEdit.steps[this._activeStepIndex];
      currentStep.items.push(...item);
    },
    removeItemFromStep(index: number) {
      const currentStep = this._scenarioToEdit.steps[this._activeStepIndex];
      currentStep.items.splice(index, 1);
    },
    removeMonsterFromStep(index: number) {
      const currentStep = this._scenarioToEdit.steps[this._activeStepIndex];
      currentStep.monsters.splice(index, 1);
    },
    removeNpcFromStep(index: number) {
      const currentStep = this._scenarioToEdit.steps[this._activeStepIndex];
      currentStep.npc.splice(index, 1);
    },
    async fetchMonsters() {
      try {
        const response = await getMonsters();
        this._monsters = response.data.results as string[];
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
        this._items = response.data.results as string[];
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
    async editScenario() {},
  },
  getters: {
    activeStep: (state) => state._scenarioToEdit.steps[state._activeStepIndex],
  },
  // persist: true,
});
