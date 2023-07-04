import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAcPwBM4EkP3WEuXd-kAJe8LuABBsT0R9w",
    authDomain: "rocketpad-9e6a4.firebaseapp.com",
    projectId: "rocketpad-9e6a4",
    storageBucket: "rocketpad-9e6a4.appspot.com",
    messagingSenderId: "116702870781",
    appId: "1:116702870781:web:425ea0d8e836981dfd9294",
    measurementId: "G-H4EJ79L70J"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
