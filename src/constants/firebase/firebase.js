
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';  // If using Firebase storage

const firebaseConfig = {
    apiKey: "AIzaSyAEwr4xFwaXnmNdVVcEwHvF8rrutUoEXVo",
    authDomain: "probabilitylab.firebaseapp.com",
    databaseURL: "https://probabilitylab.firebaseio.com",
    projectId: "probabilitylab",
    storageBucket: "probabilitylab.appspot.com",
    messagingSenderId: "20678117149",
    appId: "1:20678117149:web:ebfc81105e877fcb0503f4"
  };
// Initialize Firebase

var Firebase = app.initializeApp(firebaseConfig);

export default Firebase;



