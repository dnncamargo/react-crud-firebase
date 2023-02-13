import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"


// TODO: criar arquivo .env e inserir apiKey
const firebaseConfig = {
    apiKey: "AIzaSyD4Km8jPiG_ttKRcXbjxrQ_zIbJVL5MO2M",
    authDomain: "fir-crud-37e5f.firebaseapp.com",
    projectId: "fir-crud-37e5f",
    storageBucket: "fir-crud-37e5f.appspot.com",
    messagingSenderId: "194948758861",
    appId: "1:194948758861:web:d8a794d9e47a7f480a4b04",
    measurementId: "G-HGEZDK7XP6"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);