import { defineStore } from 'pinia'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { User } from "@/types/appTypes";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      displayName: '',
      email: '',
      uid: '',
      isUserLogged: false
    } as User
  }),
  actions: {
    async register(registerEmail: string, password: string) {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, password);
        const { displayName, email, uid } = userCredential.user;
        this.user = { displayName, email, uid, isUserLogged: true };
      } catch (error) {
        throw(error);
      }
    },
    async login(loginEmail: string, password: string) {
      try {
        const auth = getAuth()
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, password)
        const { displayName, email, uid } = userCredential.user;
        this.user = { displayName, email, uid, isUserLogged: true };
      } catch (error) {
        console.error(error)
      }
    },
    async logout() {
      try {
        const auth = getAuth()
        await auth.signOut()
        this.user = {
          displayName: '',
          email: '',
          uid: '',
          isUserLogged: false
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
  getters: {
    isUserLogged: (state) => state.user.isUserLogged,
    currentUser: (state) => state.user,
  },
  persist: true,
})
