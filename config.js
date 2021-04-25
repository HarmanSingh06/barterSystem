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

  export default firebase.firestore();


//   Time slots of the time tables:- ts1, ts2, ts3…., tsn
// List of Subjects:- s1,s2,s3, …., sn
// Teachers:- t1,t2,t3, …., tn
// Batches of students:- c1,c2,c3, ….., cn
// Flags indicating finalized timeslots :- tsf1, tsf2, tsf3, ….., tsfn
// Data structure to hold Final Timetable:-final_tt
// Count for day of week: Daycount
// Number of days of the week:- n
// Data structure to hold Subject-clash within the day:- clash
// Each element of Clash data structure:- clash_ele
// Data structure for Subject-clash across days:- Dayclash
// Each element of Dayclash data structure:-
// day_clash_element
// Subject contained in dayclash:- sdc
// Teacher associated with subject in dayclash:- tdc
// Max number of lectures of subject si in the week:-k
// Counter for the number of subjects:- counter_sub
// Random number indicating random slot allotment for
// subject:- rand_sub_allot
// Data structure to hold randomly allotted subject:-
// rand_sub_seq
// Data structure to hold all subjects:- init_sub
// C.


	







