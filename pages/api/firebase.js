import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2zm9MHxU0IvJYk3bz1-ci8VddRtFV1o0",
  authDomain: "txm-editor.firebaseapp.com",
  projectId: "txm-editor",
  storageBucket: "txm-editor.appspot.com",
  messagingSenderId: "926720854088",
  appId: "1:926720854088:web:e0ade77c976a78f8d5307d",
  measurementId: "G-CV3SWWFY2Q",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const gprovider = new GoogleAuthProvider();
const fbprovider = new FacebookAuthProvider();

export { db, auth, gprovider, fbprovider };
