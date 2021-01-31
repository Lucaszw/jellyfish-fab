import firebase from "firebase/app";
import "firebase/database";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyC2W1ABNlAybUOiS_TXnapjppGcqC2r2pE",
  authDomain: "jellyfishfab.com",
  databaseURL: "https://jellyfish-fab-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jellyfish-fab",
  storageBucket: "jellyfish-fab.appspot.com",
  messagingSenderId: "361684785078",
  appId: "1:361684785078:web:5265edbc19df8cf046d317",
  measurementId: "G-HSKP5SWWMY"
};


firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const analytics = firebase.analytics();

export {database, analytics};