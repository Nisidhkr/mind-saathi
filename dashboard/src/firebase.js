// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAe-3jfgBF1JYAG7F0DqMAuNXA4gtIIoNU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sihproject-bb92f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sihproject-bb92f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sihproject-bb92f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "252125958261",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:252125958261:web:ebe054c7ed8f8126e1a83c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-R5S2MVD2CB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();