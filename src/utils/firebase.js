import { getFirestore } from '@firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBcximHJJ0XiCpND9m7lIT-JAYzP0VvEgU",
  authDomain: "test-app-6994c.firebaseapp.com",
  databaseURL: "https://test-app-6994c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-app-6994c",
  storageBucket: "test-app-6994c.appspot.com",
  messagingSenderId: "614666124128",
  appId: "1:614666124128:web:dca958925c519517aebc05"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()

export const login = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
	return signOut(auth)
}

export const db = getFirestore()
