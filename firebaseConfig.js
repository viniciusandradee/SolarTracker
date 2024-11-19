import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
    apiKey: "AIzaSyAeFHCvKGzKSxor_3tz9hTIimv742fJcdA",
    authDomain: "solartracker-a4923.firebaseapp.com",
    projectId: "solartracker-a4923",
    storageBucket: "solartracker-a4923.firebasestorage.app",
    messagingSenderId: "473468402381",
    appId: "1:473468402381:web:871ef030e24f3a1ca60784",
    measurementId: "G-5GCYFX277Q"
  };


const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });

const database = getFirestore(app);
const storage = getStorage(app);

export { auth, database, storage };