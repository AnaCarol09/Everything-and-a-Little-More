// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPKmhm5IEADtuxwx2Ec3VeD4B1VSiQnRo",
  authDomain: "everything-and-a-little-more.firebaseapp.com",
  projectId: "everything-and-a-little-more",
  storageBucket: "everything-and-a-little-more.firebasestorage.app",
  messagingSenderId: "58792553938",
  appId: "1:58792553938:web:a639f351a5ca33dc592c0b",
  measurementId: "G-7NG7HN7P54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);