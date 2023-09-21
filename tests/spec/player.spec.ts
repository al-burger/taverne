import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePlayerStore } from "../../src/store/modules/player";
import { Player } from "../../src/types/appTypes";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

const getPlayers = (): Player[] => [
  {
    name: "test",
    race: "orc",
    class: "string",
    level: 1,
  },
  {
    name: "test",
    race: "human",
    class: "string",
    level: 1,
  },
];

describe("activeCustomersCount", () => {
  let store: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = usePlayerStore();
  });

  it("returns the players who is an orc", () => {
    const store = usePlayerStore();
    store.players = getPlayers();
    expect(store.isRaceAnOrc).toStrictEqual({
      name: "test",
      race: "orc",
      class: "string",
      level: 1,
    });
  });

  it("test the player creation", async () => {
    await store.createPlayers(["Alex", "Pierre"]);
    expect(store.players).toStrictEqual([
      {
        name: "Alex",
        race: "",
        class: "",
        level: 0,
      },
      {
        name: "Pierre",
        race: "",
        class: "",
        level: 0,
      },
    ]);
  });

  it("test if the classes are fetched", async () => {
    const mockApiResponse = {
      data: {
        results: [{ name: "Class1" }, { name: "Class2" }],
      },
    };
    vi.spyOn(axios, "get").mockResolvedValue(mockApiResponse);
    await store.fetchClasses();
    expect(store.classes).toEqual(["Class1", "Class2"]);
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
    expect(store.races).toEqual(["Race1", "Race2"]);
    // Restaurez la fonction axios.get originale
    vi.restoreAllMocks();
  });
});
