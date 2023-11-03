import { TimelineItem } from './../../types/appTypes';
import { beforeEach, describe, it, expect } from "vitest";
import { useScenarioStore } from "./scenario";
import { createPinia, setActivePinia } from "pinia";

describe("Scenario Store", () => {
  let store: any;

  // Configuration avant chaque test
  beforeEach(() => {
    setActivePinia(createPinia());
    store = useScenarioStore();
  });

  // Fonction de configuration pour créer un scénario
  function createScenario(name: string) {
    return {
      name,
      steps: [],
    };
  }

  // Fonction de configuration pour créer un scénario avec des étapes
  function createScenarioWithSteps(name: string, stepNames: string[]) {
    const steps = stepNames.map((name) => ({
      name,
      monsters: [],
      items: [],
      npc: [],
      timelineItems: [],
    }));
    return { name, steps };
  }

  it("should add a scenario", () => {
    const scenario = createScenario("test");
    store.addScenario(scenario);
    expect(store._scenarios).toContain(scenario);
  });

  it("should add the scenario to edit", () => {
    const scenario = createScenario("test");
    store.setScenarioToEdit(scenario);
    expect(store._scenarioToEdit).toEqual(scenario);
  });

  it("should add a step to the active scenario", () => {
    store._scenarioToEdit = createScenario("Test Scenario");
    store._activeStepIndex = 0;
    store.addStep("test");
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    expect(activeStep.name).toEqual("test");
  });

  it("should add a NPC to the active step", () => {
    const scenario = createScenarioWithSteps("Test Scenario", ["Step 1", "Step 2"]);
    const npc = { name: "test", title: "test" };
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    store.addNpcToStep(npc);
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    expect(activeStep.npc).toContain(npc);
  });

  it("should add a monster to the active step", () => {
    const scenario = createScenarioWithSteps("Test Scenario", ["Step 1", "Step 2"]);
    const monster = [{ name: "test" }, { name: "test2" }];
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    store.addMonsterToStep(monster);
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    expect(activeStep.monsters).toEqual(monster);
  });

  it("should add an item to the active step", () => {
    const scenario = createScenarioWithSteps("Test Scenario", ["Step 1", "Step 2"]);
    const item = [{ name: "test" }, { name: "test2" }];
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    store.addItemToStep(item);
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    expect(activeStep.items).toHaveLength(2);
    expect(activeStep.items).toEqual(item);
  });

  it("should add an TimelineItem to the active step", () => {
    const scenario = createScenarioWithSteps("Test Scenario", ["Step 1", "Step 2"]);
    const timelineItem = { title: "test", description: "test" };
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    store.addTimelineItemToStep(timelineItem);
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    expect(activeStep.timelineItems).toHaveLength(1);
    expect(activeStep.timelineItems).toEqual(timelineItem);
  });

  it("should remove a monster from the active step", () => {
    const index = 0;
    const monster = [{ name: "test" }, { name: "test2" }];
    const scenario = createScenarioWithSteps("Test Scenario", ["Step 1", "Step 2"]);
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    store.addMonsterToStep(monster);
    store.removeMonsterFromStep(index);
    expect(activeStep.monsters).toHaveLength(1);
  });

  it("should remove an item from the active step", () => {
    const index = 0;
    const item = [{ name: "test" }, { name: "test2" }];
    const scenario = createScenarioWithSteps("Test Scenario", ["Step 1", "Step 2"]);
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    store.addItemToStep(item);
    store.removeItemFromStep(index);
    expect(activeStep.items).toHaveLength(1);
  });
  
  it("should remove an NPC from the active step", () => {
    const index = 0;
    const npc = { name: "test" };
    const scenario = createScenarioWithSteps("Test Scenario", ["Step 1", "Step 2"]);
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    store.addNpcToStep(npc);
    store.removeNpcFromStep(index);
    expect(activeStep.npc).toHaveLength(0);
  });
  
  it("should remove a timeline item from the active step", () => {
    const index = 0;
    const timelineItem = { title: "test", description: "test description" };
    const scenario = createScenarioWithSteps("Test Scenario", ["Step 1", "Step 2"]);
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    store.addTimelineItemToStep(timelineItem);
    store.removeTimelineItemFromStep(index);
    expect(activeStep.timelineItems).toHaveLength(0);
  });
});
