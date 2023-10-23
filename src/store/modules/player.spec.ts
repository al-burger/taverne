import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePlayerStore } from "./player";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { results } from "../../API/__mocks__/classes";

describe("players store", () => {
  let store: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = usePlayerStore();
  });

  it("test the player creation", async () => {
    await store.addPlayers('Alex');
    expect(store._players).toStrictEqual([
      {
        name: "Alex",
        race: "",
        class: "",
        level: 1,
      }
    ]);
  });

  it("test the removal of a player", async () => {
    await store.addPlayers('alex');
    await store.removePlayer(0);
    expect(store._players).toStrictEqual([]);
  });

  it("test if the name of the campaign is created", async () => {
    await store.createCampaignName("Test campaign");
    expect(store._campaignName).toStrictEqual("Test campaign");
  });

  it("test if we get all the campaign of the user", async () => {
    await store.createCampaignName("Test campaign");
    expect(store._campaignName).toStrictEqual("Test campaign");
  });

  it("test if we set the active campaign", async () => {
    const campaign = {
      name: 'test',
      game: 'test',
      players: ['test 1', 'test 2']
    }
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
});
