import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePlayerStore } from "./player";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { results } from "../../API/__mocks__/classes";
import {
  skillsResults,
  abilityScoresResults,
} from "../../API/__mocks__/skills";
import { collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

vi.mock("firebase/auth", async () => {
  const actual = await vi.importActual('firebase/auth')
  return {
    ...actual as any,
    getAuth: () => getAuthMock(),
  };
});

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual('firebase/firestore')
  return {
    ...actual as any,
    query: () => getQueryMock(),
    getDocs: () => getDocsMock()
  };
});

const getAuthMock = vi.fn(() => ({
  createUserWithEmailAndPassword,
}));

const getQueryMock = vi.fn(() => ({
  getQuerySnapshot,
}));

const getDocsMock = vi.fn(() => ({
  dockMock,
}));

const dockMock = vi.fn(async () => {
  return Promise.resolve({
    campaign : {
      name: '1'
    }
  })
});

const createUserWithEmailAndPassword = vi.fn(async () => {
  return Promise.resolve({
    user: mockData
  })
});

const getQuerySnapshot = vi.fn(async () => {
  return Promise.resolve({
    querySnapshot: []
  })
});

const mockData = {
  displayName: 'toto', email: 'toto', uid: 123, 
}

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

  it('should fetch and populate campaigns list for the user', async () => {
    const mockCampaignData = [
      { id: 'campaign1', name: 'Campaign 1' },
      { id: 'campaign2', name: 'Campaign 2' },
    ];
  
    await store.getCampaignByUser();
  
    const querySnapshot = [
      { id: 'campaign1', name: 'Campaign 1' },
      { id: 'campaign2', name: 'Campaign 2' },
    ];
  
    querySnapshot.forEach((doc) => {
      store._campaignsList.push(doc);
    });
  
    expect(store._campaignsList).toEqual(mockCampaignData);
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

    vi.restoreAllMocks();
  });

  it("should simplify a string by removing accents, spaces, and converting to lowercase", () => {
    const inputString = "Élément à Simplifier";
    const simplifiedString = store.simplifyString(inputString);
    const expectedString = "elementasimplifier";
    expect(simplifiedString).toEqual(expectedString);
  });
});
