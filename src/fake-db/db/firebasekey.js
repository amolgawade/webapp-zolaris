import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdSuff7r_8xFtcDC9qAni_WtqUyBIRmBY",
  authDomain: "zolaris-webapp.firebaseapp.com",
  databaseURL: "https://zolaris-webapp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zolaris-webapp",
  storageBucket: "zolaris-webapp.appspot.com",
  messagingSenderId: "832706113388",
  appId: "1:832706113388:web:c84d061ec10b5706be0d49",
  measurementId: "G-1F5X3K60V5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;