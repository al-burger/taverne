import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyC4MVShznHKQNwcy1wJtFX8xsfcvdZ9gHA",
    authDomain: "taverne-af4e6.firebaseapp.com",
    databaseURL: "https://taverne-af4e6-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "taverne-af4e6",
    storageBucket: "taverne-af4e6.appspot.com",
    messagingSenderId: "409477337317",
    appId: "1:409477337317:web:37666a2b49239f4d7d440c"
});

const db = getFirestore(firebaseApp);
export const playersCollection = collection(db, 'players');