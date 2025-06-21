// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { get } from "http";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDL_rhlnDMgXBu3rdEMjrBWrVEkYXEpESw",
  authDomain: "formulariocontacto-dff40.firebaseapp.com",
  projectId: "formulariocontacto-dff40",
  storageBucket: "formulariocontacto-dff40.firebasestorage.app",
  messagingSenderId: "886508038574",
  appId: "1:886508038574:web:0c912a56c54c8348c5403f",
  measurementId: "G-7851PEPQZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(app);