import { initializeApp } from 'firebase/app';
import {
  getAuth, GoogleAuthProvider,
  signInWithPopup, signInWithRedirect, getRedirectResult,
  signOut, signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAXwY6mV3tbSHTkSxBc2qYIM9tdO0DdeIg",
  authDomain: "gen-lang-client-0134911062.firebaseapp.com",
  projectId: "gen-lang-client-0134911062",
  storageBucket: "gen-lang-client-0134911062.firebasestorage.app",
  messagingSenderId: "732694150294",
  appId: "1:732694150294:web:ee547c09438f2613a156b7",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app, "ai-studio-00cbe5b1-a121-41b4-b4d0-c40153d7cd32");
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

const isMobile = /Mobi|Android|iPad|Tablet/i.test(navigator.userAgent);

export const loginWithGoogle = () =>
  isMobile ? signInWithRedirect(auth, googleProvider) : signInWithPopup(auth, googleProvider);

export { getRedirectResult };
export const loginWithEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
