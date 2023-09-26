import { getClasses } from "../../API/classes";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { usePlayerStore } from "./player";
import { Player } from "../../types/appTypes";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { results } from "../../API/__mocks__/classes";

describe("activeCustomersCount", () => {
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
        level: 0,
      }
    ]);
  });

  it("test if the name of the campaign is created", async () => {
    await store.createCampaignName("Test campaign");
    expect(store._campaignName).toStrictEqual("Test campaign");
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
