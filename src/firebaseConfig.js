import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD8PIPd0SYpklzk_BEunDMu_h6yd6_NIzI",
    authDomain: "niccomerece.firebaseapp.com",
    projectId: "niccomerece",
    storageBucket: "niccomerece.appspot.com",
    messagingSenderId: "419061017510",
    appId: "1:419061017510:web:a0e196cf0fa4e7104fbd67",
    measurementId: "G-DFKE7P3S10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
