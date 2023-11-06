import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { useAuthStore } from "./auth";
import { createPinia, setActivePinia } from "pinia";

const mockData = {
  displayName: 'toto', email: 'toto', uid: 123, 
}
// Mock de Firebase Auth
const createUserWithEmailAndPassword = vi.fn(async () => {
  return Promise.resolve({
    user: mockData
  })
});
const getAuthMock = vi.fn(() => ({
  createUserWithEmailAndPassword,
}));
const signInWithEmailAndPasswordMock = vi.fn(() => {
  createUserWithEmailAndPassword
});

vi.mock("firebase/auth", async () => {
  const actual = await vi.importActual('firebase/auth')
  return {
    ...actual as any,
    createUserWithEmailAndPassword: () => createUserWithEmailAndPassword(),
    getAuth: () => getAuthMock(),
    signInWithEmailAndPassword:() => signInWithEmailAndPasswordMock(),
  };
});

describe("auth store", () => {
  let store: any;
  beforeEach(() => {
    setActivePinia(createPinia());
    store = useAuthStore();
  });
  it('L utilisateur se créée un compte', async() => {
    await store.register('toto', '1234');
    expect(store.user).toEqual({...mockData, isUserLogged: true});
  })
  it('L utilisateur rencontre une erreur', async() => {
    (getAuthMock as Mocked<any>).mockImplementation(() => Promise.reject());
  })
  it('L utilisateur se connecte', async() => {
    await store.login('toto', '1234');
    expect(store.user).toEqual({...mockData, isUserLogged: true});
  })
});
