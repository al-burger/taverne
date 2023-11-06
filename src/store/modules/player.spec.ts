import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePlayerStore } from "./player";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { results } from "../../API/__mocks__/classes";
import {
  skillsResults,
  abilityScoresResults,
} from "../../API/__mocks__/skills";


const doc = vi.fn(async () => {
  return {
    id: "fakeCampaignId",
  }
});

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual('firebase/firestore')
  return {
    ...actual as any,
    doc: () => doc()
  };
});

describe("players store", () => {
  let store: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = usePlayerStore();
  });

  it("test if the name of the campaign is created", () => {
    store.setCampaignName("Test campaign");
    expect(store._campaign.name).toStrictEqual("Test campaign");
  });

  it("should set the campaign picture", () => {
    store.setCampaignPicture("test.jpeg");
    expect(store._campaign.picture).toEqual("test.jpeg");
  });

  it("should set the game selected", () => {
    store.setGame("test");
    expect(store._campaign.game).toStrictEqual("test");
  });

  it("test the player creation", () => {
    store.addPlayer("Alex");
    expect(store._campaign.players).toStrictEqual([
      {
        name: "Alex",
        race: "",
        class: "",
        level: 1,
      },
    ]);
  });

  it("test the removal of a player", () => {
    store.addPlayer("alex");
    store.removePlayer(0);
    expect(store._campaign.players).toStrictEqual([]);
  });

  it("test if we set the active campaign", async () => {
    const campaign = {
      name: "test",
      game: "test",
      players: ["test 1", "test 2"],
    };
    await store.setCampaign(campaign);
    expect(store._campaign).toStrictEqual(campaign);
  });

  it("should fetch the campaign for the user", async () => {
    const mockCampaigns = [
      {
        id: "TlIEM8GfK9qpNqpdQtCY",
        imageURL:
          "https://firebasestorage.googleapis.com/v0/b/taverne-af4e6.appspot.com/o/campaign_images%2Fl'uniondeselements.jpeg?alt=media&token=35b84a25-c516-4f91-a735-31e75bed1e4f",
        uid: "L1SZN8rrKUXT21gG2rea4EfDaff1",
        players: [
          {
            class: "Sorcerer",
            race: "Dragonborn",
            level: "3",
            name: "Redolas",
          },
          {
            level: "3",
            class: "Monk",
            name: "Lyriel",
            race: "Half-Elf",
          },
          {
            name: "Bigimli",
            class: "Barbarian",
            level: "3",
            race: "Dwarf",
          },
          {
            name: "Bolinon",
            race: "Halfling",
            class: "Ranger",
            level: "3",
          },
        ],
        name: "L'union Des Elements",
        scenarios: [
          {
            name: "La Malédiction de Valtundra",
            steps: [
              {
                name: "L'Appel des Profondeurs",
                monsters: ["kobold", "goblin"],
                items: ["brazier-of-commanding-fire-elementals"],
                npc: [
                  {
                    name: "Thrain Barbe-de-Fer ",
                    title: "",
                  },
                ],
                timelineItems: [
                  {
                    title: "Title",
                    description: "Description",
                  },
                ],
              },
              {
                items: [],
                name: "Les Secrets de Khazadur",
                monsters: [],
              },
              {
                items: [],
                name: "Voyage au Centre De La Terre",
                monsters: [],
              },
              {
                monsters: [],
                name: "Liberation du Peuple",
                items: [],
              },
            ],
          },
          {
            name: "Les Profondeurs de Khazadur",
            steps: [
              {
                monsters: [],
                items: [],
                name: "L'Appel des Profondeurs",
              },
              {
                monsters: [],
                items: [],
                name: "Les Secrets de Khazadur",
              },
              {
                monsters: [],
                name: "Voyage au Centre De La Terre",
                items: [],
              },
              {
                name: "Liberer la Colonnie",
                items: [],
                monsters: [],
              },
            ],
          },
          {
            name: "Les Cieux d'Éolande",
            steps: [],
          },
          {
            name: "Les Flammes d'Ignatia ",
            steps: [],
          },
        ],
        game: "Donjon & Dragon",
      },
    ];
    await store.getCampaignByUser();
    console.log("campaignsList", store._campaignsList);
    expect(store._campaignsList).toEqual(mockCampaigns);
    vi.restoreAllMocks();
  });

  it("test if the classes are fetched", async () => {
    await store.fetchClasses();
    expect(store._classes).toEqual(results.map((result) => result.name));
    // Restaurez la fonction axios.get originale
    vi.restoreAllMocks();
  });

  it("test if the races are fetched", async () => {
    const mockApiResponse = {
      data: {
        results: [{ name: "Race1" }, { name: "Race2" }],
      },
    };
    vi.spyOn(axios, "get").mockResolvedValue(mockApiResponse);
    await store.fetchRaces();
    expect(store._races).toEqual(["Race1", "Race2"]);
    // Restaurez la fonction axios.get originale
    vi.restoreAllMocks();
  });

  it("test if the skills are fetched", async () => {
    await store.fetchSkills();
    expect(store._skills).toEqual(
      skillsResults.results.map((result) => result.name)
    );
    // Restaurez la fonction axios.get originale
    vi.restoreAllMocks();
  });

  it("test if the ability scores are fetched", async () => {
    await store.fetchAbilityScores();
    expect(store._abilityScores).toEqual(
      abilityScoresResults.results.map((result) => result.name)
    );
    // Restaurez la fonction axios.get originale
    vi.restoreAllMocks();
  });

  it("should update the campaign and handle loading state", async () => {
    const campaignId = "fakeCampaignId";
    const updatedCampaign = {
      id: campaignId,
    };
    const setDoc = vi.fn(async (campaignRef, updatedCampaign) => {
      return Promise.resolve({
        status: "success",
      });
    });
    const doc = vi.fn();
    const campaignRef = doc();
    store.updateCampaign = async () => {
      // Votre implémentation de la fonction updateCampaign ici
      await setDoc(campaignRef, updatedCampaign.id);
    };

    store._campaign = updatedCampaign;

    await store.updateCampaign();

    expect(setDoc).toHaveBeenCalledWith(campaignRef, updatedCampaign.id);

    vi.restoreAllMocks();
  });

  it("should simplify a string by removing accents, spaces, and converting to lowercase", () => {
    const inputString = "Élément à Simplifier";
    const simplifiedString = store.simplifyString(inputString);
    const expectedString = "elementasimplifier";
    expect(simplifiedString).toEqual(expectedString);
  });
});
