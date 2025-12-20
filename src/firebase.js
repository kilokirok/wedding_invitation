	
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbUf-RHtxSPnWP7C212fu4ahvCMyJdGXg",
  authDomain: "ji-cl-wedding.firebaseapp.com",
  projectId: "ji-cl-wedding",
  storageBucket: "ji-cl-wedding.firebasestorage.app",
  messagingSenderId: "634690673184",
  appId: "1:634690673184:web:1cfc8b14c907a0f281fa45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);