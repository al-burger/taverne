import { defineStore } from "pinia";
import { Scenario } from "../../types/appTypes";

export const useScenarioStore = defineStore("scenario", {
  state: () => ({
    _scenarios: [{ name: "scenario 1" }, { name: "scenario 2" }] as Scenario[],
    _scenarioToEdit: {}
  }),
  actions: {
    setScenarioToEdit(scenario: Scenario) {
      this._scenarioToEdit = scenario;
    },
    async fetchScenarios() {
      try {
        this._scenarios = [{ name: "Scenario 1" }, { name: "Scenario 2" }];
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {},
  // persist: true,
});
