// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOxifkx-NZcVbbwo_BBZZxLexdTnyXvRQ",
  authDomain: "photomanager-b25a8.firebaseapp.com",
  projectId: "photomanager-b25a8",
  storageBucket: "photomanager-b25a8.appspot.com",
  messagingSenderId: "168527895263",
  appId: "1:168527895263:web:c0ddd1b844ebc20408276a",
  measurementId: "G-TL0KH15XEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//Storage
export const storage = getStorage()

//auth
export const auth = getAuth(app);