import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4qTkE35XM3FsdgSGUiOESfVvcpOmhA5Y",
  authDomain: "movie-watchlist-5edc1.firebaseapp.com",
  projectId: "movie-watchlist-5edc1",
  storageBucket: "movie-watchlist-5edc1.firebasestorage.app",
  messagingSenderId: "951174910477",
  appId: "1:951174910477:web:1f7eb879fd506bd1c97b44",
  measurementId: "G-GG73KPW1GN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);