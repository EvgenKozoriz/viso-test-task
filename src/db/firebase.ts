import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "viso-test-task.firebaseapp.com",
  projectId: "viso-test-task",
  storageBucket: "viso-test-task.appspot.com",
  messagingSenderId: "963032303145",
  appId: "1:963032303145:web:48cd6a4594223b2efefe38",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
