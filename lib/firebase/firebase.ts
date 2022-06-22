// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb9ZpVxu0nHP1_7MHwDBOEt0qAdZ-y40A",
  authDomain: "startapp-cdd53.firebaseapp.com",
  projectId: "startapp-cdd53",
  storageBucket: "startapp-cdd53.appspot.com",
  messagingSenderId: "1054678327033",
  appId: "1:1054678327033:web:93dd548aaa3483dd750c28",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

const googleAuthProvider = new GoogleAuthProvider();

export { auth, db, storage, googleAuthProvider };
