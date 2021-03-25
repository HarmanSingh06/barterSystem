import firebase from 'firebase';
require("@firebase/firestore")

var firebaseConfig = {
  apiKey: "AIzaSyAS3fxWajFWCdKeL-DVBH8Mojk57Ea2hN0",
  authDomain: "bartersys-df095.firebaseapp.com",
  projectId: "bartersys-df095",
  storageBucket: "bartersys-df095.appspot.com",
  messagingSenderId: "299354120320",
  appId: "1:299354120320:web:ca3bfb1c9aadd841480665"
}
  // Initialize Firebase
  if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  }
  
  export default firebase.firestore();