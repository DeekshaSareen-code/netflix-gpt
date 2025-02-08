// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQjpEAjvY7qPBFYAMAVH2L_P9epnu123I",
  authDomain: "netflix-gpt-6a5ae.firebaseapp.com",
  projectId: "netflix-gpt-6a5ae",
  storageBucket: "netflix-gpt-6a5ae.firebasestorage.app",
  messagingSenderId: "779479677262",
  appId: "1:779479677262:web:6ab19286443528cd40861f",
  measurementId: "G-RY4F9YGPFX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
