import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPAoOaGxwaaaXECT_59EL-bV2lTcnlu6Y",
  authDomain: "todo-f7ac7.firebaseapp.com",
  projectId: "todo-f7ac7",
  storageBucket: "todo-f7ac7.appspot.com",
  messagingSenderId: "32887435115",
  appId: "1:32887435115:web:cd69cdbd41bb4d195be62e",
  measurementId: "G-Y7SK6XP6VZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);