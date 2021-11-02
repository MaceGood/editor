import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCvI5ajQPRdg6MARNbm37_GqwKR6j90Cg",
  authDomain: "txm-editor-96447.firebaseapp.com",
  projectId: "txm-editor-96447",
  storageBucket: "txm-editor-96447.appspot.com",
  messagingSenderId: "80416896752",
  appId: "1:80416896752:web:85d20da454f97c226e7435",
  measurementId: "G-P8D9ZJZFTK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const gprovider = new GoogleAuthProvider();
const fbprovider = new FacebookAuthProvider();

export { db, auth, gprovider, fbprovider };
