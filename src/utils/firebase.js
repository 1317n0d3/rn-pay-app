import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJhv13BBnj_9hsUqO5j_OlXFAXp6HqOTY",
  authDomain: "sberbank-26ac0.firebaseapp.com",
  projectId: "sberbank-26ac0",
  storageBucket: "sberbank-26ac0.appspot.com",
  messagingSenderId: "91472860999",
  appId: "1:91472860999:web:759d31081936d4fff01e62",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const db = getFirestore();
