import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBwbbHb0L-Jy56NZfpSqQv696xT6452B9U",
  authDomain: "e-commerce-54506.firebaseapp.com",
  projectId: "e-commerce-54506",
  storageBucket: "e-commerce-54506.appspot.com",
  messagingSenderId: "654734223644",
  appId: "1:654734223644:web:d566fee54e8d3ffab0b2d9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, auth, storage, provider };
