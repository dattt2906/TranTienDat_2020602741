// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGVlnLAJEn1xv8jop9wzuBbq3HU8kpV4A",
  authDomain: "uploadimage-b250d.firebaseapp.com",
  projectId: "uploadimage-b250d",
  storageBucket: "uploadimage-b250d.appspot.com",
  messagingSenderId: "463882596676",
  appId: "1:463882596676:web:7197b1c82c4dc67b436711",
  measurementId: "G-D4732YTWJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDb=getStorage(app)