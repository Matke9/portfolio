// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpjv973jfIHoZs-Yo6Fy-QhDbwLi_D6jQ",
  authDomain: "portfolio-dc7b6.firebaseapp.com",
  projectId: "portfolio-dc7b6",
  storageBucket: "portfolio-dc7b6.firebasestorage.app",
  messagingSenderId: "340713262653",
  appId: "1:340713262653:web:12dc0f8701f1839f9be454",
  measurementId: "G-DR1B2ES8D7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);