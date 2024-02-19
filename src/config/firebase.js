import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCaAJATqbkFwe1GxsheCGTDct_a3nFte2c",
    authDomain: "dentist-website-huzaifa.firebaseapp.com",
    projectId: "dentist-website-huzaifa",
    storageBucket: "dentist-website-huzaifa.appspot.com",
    messagingSenderId: "387985520455",
    appId: "1:387985520455:web:76f517f11783ac58ab7e62"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth }