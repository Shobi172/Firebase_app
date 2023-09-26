import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDyjz7v520ChZfA9ldCiDZg1KR3seTYEFI",
  authDomain: "user-management-app-6a49e.firebaseapp.com",
  databaseURL: "https://user-management-app-6a49e-default-rtdb.firebaseio.com",
  projectId: "user-management-app-6a49e",
  storageBucket: "user-management-app-6a49e.appspot.com",
  messagingSenderId: "1017475657723",
  appId: "1:1017475657723:web:0e3dbbe485acd0fb51e55e"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database as db };
