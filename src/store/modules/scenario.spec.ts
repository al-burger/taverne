import { beforeEach, describe, it, expect, vi } from "vitest";
import { useScenarioStore } from "./scenario";
import { createPinia, setActivePinia } from "pinia";
import { resultMonsterStats, results } from "../../API/__mocks__/monsters";
import { itemsResults, itemStatsResults } from "../../API/__mocks__/items";
import axios from "axios";
import { usePlayerStore } from "./player";

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

  it("should set the scenario", () => {
    const playerStore = usePlayerStore();

    playerStore._campaign.scenarios = [
      {
        name: "Scenario 1",
        steps: [
          {
            name: "Étape 1",
            npc: [{ name: "NPC 1", title: "Marchand" }],
            monsters: [{ name: "Monstre 1" }],
            items: ["Épée magique", "Potion de soin"],
            timelineItems: [
              { title: "Événement 1", description: "Quelque chose se passe." },
            ],
            summary: "Résumé de l'étape 1",
            places: [
              { name: "Village 1", description: "Un village pittoresque." },
            ],
          },
          {
            name: "Étape 2",
            npc: [{ name: "NPC 2", title: "Forgeron" }],
            monsters: [{ name: "Monstre 2" }],
            items: ["Armure lourde", "Élixir de puissance"],
            timelineItems: [
              { title: "Événement 2", description: "Un autre événement." },
            ],
            summary: "Résumé de l'étape 2",
            places: [
              { name: "Forêt 1", description: "Une forêt mystérieuse." },
            ],
          },
        ],
      },
    ];

    store.setScenarios();

    expect(store._scenarios).toEqual(playerStore._campaign.scenarios);
  });

  it("should set the active step", () => {
    store.setActiveStep(0)
    expect(store._activeStepIndex).toEqual(0)
  });

  it("should add a step to the active scenario", () => {
    store._scenarioToEdit = createScenario("Test Scenario");
    store._activeStepIndex = 0;
    store.addStep("test");
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    expect(activeStep.name).toEqual("test");
  });

  it("should add a NPC to the active step", () => {
    const scenario = createScenarioWithSteps("Test Scenario", [
      "Step 1",
      "Step 2",
    ]);
    const npc = { name: "test", title: "test" };
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    store.addNpcToStep(npc);
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    expect(activeStep.npc).toContain(npc);
  });

  it("should add a monster to the active step", () => {
    const scenario = createScenarioWithSteps("Test Scenario", [
      "Step 1",
      "Step 2",
    ]);
    const monster = [{ name: "test" }, { name: "test2" }];
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    store.addMonsterToStep(monster);
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    expect(activeStep.monsters).toEqual(monster);
  });

  it("should add a summary to the step", () => {
    const summary = "test";
    const scenario = createScenarioWithSteps("Test Scenario", [
      "Step 1",
      "Step 2",
    ]);
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    store.addSummaryToStep(summary);
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    expect(activeStep.summary).toEqual(summary);
  });

  it("should add an item to the active step", () => {
    const scenario = createScenarioWithSteps("Test Scenario", [
      "Step 1",
      "Step 2",
    ]);
    const item = [{ name: "test" }, { name: "test2" }];
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    store.addItemToStep(item);
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    expect(activeStep.items).toHaveLength(2);
    expect(activeStep.items).toEqual(item);
  });

  it("should add places to steps", () => {
    const scenario = createScenarioWithSteps("Test Scenario", [
      "Step 1",
      "Step 2",
    ]);
    const place = [{ name: "string", description: "string" }];
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    store.addPlacesToStep(place);
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    expect(activeStep.places).toHaveLength(1);
    expect(activeStep.places).toContain(place);
  });

  it("should add an TimelineItem to the active step", () => {
    const scenario = createScenarioWithSteps("Test Scenario", [
      "Step 1",
      "Step 2",
    ]);
    const timelineItem = { title: "test", description: "test" };
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    store.addTimelineItemToStep(timelineItem);
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    expect(activeStep.timelineItems).toHaveLength(1);
    expect(activeStep.timelineItems).toContain(timelineItem);
  });

  it("should remove a monster from the active step", () => {
    const index = 0;
    const monster = [{ name: "test" }, { name: "test2" }];
    const scenario = createScenarioWithSteps("Test Scenario", [
      "Step 1",
      "Step 2",
    ]);
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
    const scenario = createScenarioWithSteps("Test Scenario", [
      "Step 1",
      "Step 2",
    ]);
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
    const scenario = createScenarioWithSteps("Test Scenario", [
      "Step 1",
      "Step 2",
    ]);
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    store.addNpcToStep(npc);
    store.removeNpcFromStep(index);
    expect(activeStep.npc).toHaveLength(0);
  });

  it("should update the active step", () => {
    const stepObject = {
      name: "Example Step",
      npc: [
        { name: "NPC 1", title: "Title 1" },
        { name: "NPC 2", title: "Title 2" }
      ],
      monsters: [
        { name: "Monster 1" },
        { name: "Monster 2" }
      ],
      items: ["Item 1", "Item 2"],
      timelineItems: [
        { title: "Timeline Item 1", description: "Description 1" },
        { title: "Timeline Item 2", description: "Description 2" }
      ],
      summary: "Summary of the step",
      places: [
        { name: "Place 1", description: "Description of Place 1" },
        { name: "Place 2", description: "Description of Place 2" }
      ]
    };
    const scenario = createScenarioWithSteps("Test Scenario", [
      "Step 1",
      "Step 2",
    ]);
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    store.updateStep(0, stepObject);
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    expect(activeStep).toEqual(stepObject);
  });

  it("should remove a timeline item from the active step", () => {
    const index = 0;
    const timelineItem = { title: "test", description: "test description" };
    const scenario = createScenarioWithSteps("Test Scenario", [
      "Step 1",
      "Step 2",
    ]);
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    const activeStep = store._scenarioToEdit.steps[store._activeStepIndex];
    store.addTimelineItemToStep(timelineItem);
    store.removeTimelineItemFromStep(index);
    expect(activeStep.timelineItems).toHaveLength(0);
  });

  it("should fetch the monsters", async () => {
    const mockApiResponse = {
      data: {
        results: [
          {
            index: "aboleth",
            name: "Aboleth",
            url: "/api/monsters/aboleth",
          },
          {
            index: "acolyte",
            name: "Acolyte",
            url: "/api/monsters/acolyte",
          },
          {
            index: "adult-black-dragon",
            name: "Adult Black Dragon",
            url: "/api/monsters/adult-black-dragon",
          },
        ],
      },
    };
    vi.spyOn(axios, "get").mockResolvedValue(mockApiResponse);
    await store.fetchMonsters();
    expect(store._monsters).toEqual(results);
    
    vi.restoreAllMocks();
  });

  it("should fetch the monster stats", async () => {
    const mockApiResponse = {
      data: {
        index: "aboleth",
        name: "Aboleth",
        size: "Large",
        type: "aberration",
        alignment: "lawful evil",
        armor_class: [{ type: "natural", value: 17 }],
        hit_points: 135,
        hit_dice: "18d10",
        hit_points_roll: "18d10+36",
        speed: { walk: "10 ft.", swim: "40 ft." },
        strength: 21,
        dexterity: 9,
        constitution: 15,
        intelligence: 18,
        wisdom: 15,
        charisma: 18,
        proficiencies: [
          {
            value: 6,
            proficiency: {
              index: "saving-throw-con",
              name: "Saving Throw: CON",
              url: "/api/proficiencies/saving-throw-con",
            },
          },
          {
            value: 8,
            proficiency: {
              index: "saving-throw-int",
              name: "Saving Throw: INT",
              url: "/api/proficiencies/saving-throw-int",
            },
          },
          {
            value: 6,
            proficiency: {
              index: "saving-throw-wis",
              name: "Saving Throw: WIS",
              url: "/api/proficiencies/saving-throw-wis",
            },
          },
          {
            value: 12,
            proficiency: {
              index: "skill-history",
              name: "Skill: History",
              url: "/api/proficiencies/skill-history",
            },
          },
          {
            value: 10,
            proficiency: {
              index: "skill-perception",
              name: "Skill: Perception",
              url: "/api/proficiencies/skill-perception",
            },
          },
        ],
        damage_vulnerabilities: [],
        damage_resistances: [],
        damage_immunities: [],
        condition_immunities: [],
        senses: { darkvision: "120 ft.", passive_perception: 20 },
        languages: "Deep Speech, telepathy 120 ft.",
        challenge_rating: 10,
        proficiency_bonus: 4,
        xp: 5900,
        special_abilities: [
          {
            name: "Amphibious",
            desc: "The aboleth can breathe air and water.",
          },
          {
            name: "Mucous Cloud",
            desc: "While underwater, the aboleth is surrounded by transformative mucus. A creature that touches the aboleth or that hits it with a melee attack while within 5 ft. of it must make a DC 14 Constitution saving throw. On a failure, the creature is diseased for 1d4 hours. The diseased creature can breathe only underwater.",
            dc: {
              dc_type: {
                index: "con",
                name: "CON",
                url: "/api/ability-scores/con",
              },
              dc_value: 14,
              success_type: "none",
            },
          },
          {
            name: "Probing Telepathy",
            desc: "If a creature communicates telepathically with the aboleth, the aboleth learns the creature's greatest desires if the aboleth can see the creature.",
          },
        ],
        actions: [
          {
            name: "Multiattack",
            multiattack_type: "actions",
            desc: "The aboleth makes three tentacle attacks.",
            actions: [{ action_name: "Tentacle", count: 3, type: "melee" }],
          },
          {
            name: "Tentacle",
            desc: "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution saving throw or become diseased. The disease has no effect for 1 minute and can be removed by any magic that cures disease. After 1 minute, the diseased creature's skin becomes translucent and slimy, the creature can't regain hit points unless it is underwater, and the disease can be removed only by heal or another disease-curing spell of 6th level or higher. When the creature is outside a body of water, it takes 6 (1d12) acid damage every 10 minutes unless moisture is applied to the skin before 10 minutes have passed.",
            attack_bonus: 9,
            dc: {
              dc_type: {
                index: "con",
                name: "CON",
                url: "/api/ability-scores/con",
              },
              dc_value: 14,
              success_type: "none",
            },
            damage: [
              {
                damage_type: {
                  index: "bludgeoning",
                  name: "Bludgeoning",
                  url: "/api/damage-types/bludgeoning",
                },
                damage_dice: "2d6+5",
              },
              {
                damage_type: {
                  index: "acid",
                  name: "Acid",
                  url: "/api/damage-types/acid",
                },
                damage_dice: "1d12",
              },
            ],
            actions: [],
          },
          {
            name: "Tail",
            desc: "Melee Weapon Attack: +9 to hit, reach 10 ft. one target. Hit: 15 (3d6 + 5) bludgeoning damage.",
            attack_bonus: 9,
            damage: [
              {
                damage_type: {
                  index: "bludgeoning",
                  name: "Bludgeoning",
                  url: "/api/damage-types/bludgeoning",
                },
                damage_dice: "3d6+5",
              },
            ],
            actions: [],
          },
          {
            name: "Enslave",
            desc: "The aboleth targets one creature it can see within 30 ft. of it. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the aboleth until the aboleth dies or until it is on a different plane of existence from the target. The charmed target is under the aboleth's control and can't take reactions, and the aboleth and the target can communicate telepathically with each other over any distance.\nWhenever the charmed target takes damage, the target can repeat the saving throw. On a success, the effect ends. No more than once every 24 hours, the target can also repeat the saving throw when it is at least 1 mile away from the aboleth.",
            usage: { type: "per day", times: 3 },
            dc: {
              dc_type: {
                index: "wis",
                name: "WIS",
                url: "/api/ability-scores/wis",
              },
              dc_value: 14,
              success_type: "none",
            },
            actions: [],
          },
        ],
        legendary_actions: [
          {
            name: "Detect",
            desc: "The aboleth makes a Wisdom (Perception) check.",
          },
          { name: "Tail Swipe", desc: "The aboleth makes one tail attack." },
          {
            name: "Psychic Drain (Costs 2 Actions)",
            desc: "One creature charmed by the aboleth takes 10 (3d6) psychic damage, and the aboleth regains hit points equal to the damage the creature takes.",
            attack_bonus: 0,
            damage: [
              {
                damage_type: {
                  index: "psychic",
                  name: "Psychic",
                  url: "/api/damage-types/psychic",
                },
                damage_dice: "3d6",
              },
            ],
          },
        ],
        image: "/api/images/monsters/aboleth.png",
        url: "/api/monsters/aboleth",
      },
    };
    vi.spyOn(axios, "get").mockResolvedValue(mockApiResponse);
    const stats = await store.fetchMonsterStats("aboleth");
    expect(stats).toEqual(resultMonsterStats);
    
    vi.restoreAllMocks();
  });

  it("should fetch the items", async () => {
    const mockApiResponse = {
      data: {
        results: [
          {
            index: "amulet-of-health",
            name: "Amulet of Health",
            url: "/api/magic-items/amulet-of-health",
          },
          {
            index: "amulet-of-proof-against-detection-and-location",
            name: "Amulet of Proof against Detection and Location",
            url: "/api/magic-items/amulet-of-proof-against-detection-and-location",
          },
          {
            index: "amulet-of-the-planes",
            name: "Amulet of the Planes",
            url: "/api/magic-items/amulet-of-the-planes",
          },
        ],
      },
    };
    vi.spyOn(axios, "get").mockResolvedValue(mockApiResponse);
    await store.fetchItems();
    expect(store._items).toEqual(itemsResults);
    
    vi.restoreAllMocks();
  });

  it("should fetch the items stats", async () => {
    const mockApiResponse = {
      data: {
        results: {
          index: "amulet-of-health",
          name: "Amulet of Health",
          equipment_category: {
            index: "wondrous-items",
            name: "Wondrous Items",
            url: "/api/equipment-categories/wondrous-items",
          },
          rarity: {
            name: "Rare",
          },
          variants: [],
          variant: false,
          desc: [
            "Wondrous item, rare (requires attunement)",
            "Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution is already 19 or higher",
          ],
          url: "/api/magic-items/amulet-of-health",
        },
      },
    };
    vi.spyOn(axios, "get").mockResolvedValue(mockApiResponse);
    const res = await store.fetchItemStats("amulet-of-health");
    expect(res).toEqual(itemStatsResults);
    vi.restoreAllMocks();
  });

  it("should return the active step", () => {
    const scenario = createScenarioWithSteps("Test Scenario", ["Step 1", "Step 2"]);
    store._scenarioToEdit = scenario;
    store._activeStepIndex = 0;
    const activeStep = store.activeStep;
    expect(activeStep).toEqual(scenario.steps[0]);
  });
});
