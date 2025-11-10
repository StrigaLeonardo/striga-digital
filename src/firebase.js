// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8zTkcOZuN6OswGA3FevCyvkfLf_A5XXQ",
  authDomain: "striga-digital.firebaseapp.com",
  projectId: "striga-digital",
  storageBucket: "striga-digital.firebasestorage.app",
  messagingSenderId: "301769608835",
  appId: "1:301769608835:web:386cd7acbd7bb7196e95b6",
  measurementId: "G-632KX7CGVG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
