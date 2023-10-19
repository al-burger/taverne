import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuthStore } from "./auth";
import { createPinia, setActivePinia } from "pinia";

// Mock de Firebase Auth
const createUserWithEmailAndPassword = vi.fn();
const getAuth = vi.fn(() => ({
  createUserWithEmailAndPassword,
}));

vi.mock("./auth.ts", () => {
  return {
    createUserWithEmailAndPassword,
    getAuth,
  };
});

describe("auth store", () => {
  let store: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useAuthStore();
  });

  it("Devrait inscrire un utilisateur avec succès", async () => {
    // Mockez la réponse createUserWithEmailAndPassword
    const userCredential = {
      user: {
        displayName: "John Doe",
        email: "john@example.com",
        uid: "test-uid",
      },
    };
    createUserWithEmailAndPassword.mockResolvedValue(userCredential);

    // Appelez la fonction à tester
    const result = await store.register("john@example.com", "password123");

    // Vérifiez les appels de fonctions Firebase Auth
    expect(getAuth).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      getAuth(),
      "john@example.com",
      "password123"
    );

    // Vérifiez les résultats de la fonction
    expect(result).toEqual(userCredential);
  });
});
