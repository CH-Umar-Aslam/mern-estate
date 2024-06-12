// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e2e91.firebaseapp.com",
  projectId: "mern-estate-e2e91",
  storageBucket: "mern-estate-e2e91.appspot.com",
  messagingSenderId: "553558013332",
  appId: "1:553558013332:web:22fc523e86ca754780cb81"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);