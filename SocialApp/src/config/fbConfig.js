import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

  
  const firebaseConfig = {
    apiKey: "AIzaSyD-0uTHlw_DEJi5smmDa7gji_8415-VZjU",
    authDomain: "socialapp-d671d.firebaseapp.com",
    databaseURL: "https://socialapp-d671d-default-rtdb.firebaseio.com",
    projectId: "socialapp-d671d",
    storageBucket: "socialapp-d671d.appspot.com",
    messagingSenderId: "164191960258",
    appId: "1:164191960258:web:e44d3afaff280234890f5b",
    measurementId: "G-VZXD5XHLBF"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true})


export default firebase;