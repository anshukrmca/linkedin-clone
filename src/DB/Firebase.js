import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBScerb7UJgB7bBpm2JlxTzeb5qUZfaQcI",
  authDomain: "linkedin-clone-d79a1.firebaseapp.com",
  projectId: "linkedin-clone-d79a1",
  storageBucket: "linkedin-clone-d79a1.appspot.com",
  messagingSenderId: "302023573924",
  appId: "1:302023573924:web:2d7a001d44a716fddb8131",
  measurementId: "G-YQVF4K2NG0"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth();
export const storage = getStorage(firebaseApp);