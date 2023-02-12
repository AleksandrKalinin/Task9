import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlrmK3jerG7IVHhQ9xxLyCvByU_BqKh2Q",
  authDomain: "minipaint-11619.firebaseapp.com",
  projectId: "minipaint-11619",
  storageBucket: "minipaint-11619.appspot.com",
  messagingSenderId: "990741758796",
  appId: "1:990741758796:web:3c1d81ca2b648b02fcc5e9",
};

// Initialize Firebase
export const firebaseApp: any = initializeApp(firebaseConfig);
export const db: any = getFirestore(firebaseApp);
export const auth: any = getAuth(firebaseApp);
