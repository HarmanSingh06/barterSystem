import firebase from 'firebase'
require("@firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyBMsznhKB4IvjSmsC3r8YB2-Z8Pk2yFKmU",
    authDomain: "player-fc72e.firebaseapp.com",
    databaseURL: "https://player-fc72e-default-rtdb.firebaseio.com",
    projectId: "player-fc72e",
    storageBucket: "player-fc72e.appspot.com",
    messagingSenderId: "198632234201",
    appId: "1:198632234201:web:c7b8c635371924fe17b2c8"
  }; 

  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig)
  }

  export default firebase.database();