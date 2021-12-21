import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAone7M9-B98alu51cryuqRPlOwZrCSMNE",
    authDomain: "vibez-c9301.firebaseapp.com",
    projectId: "vibez-c9301",
    storageBucket: "vibez-c9301.appspot.com",
    messagingSenderId: "785263705260",
    appId: "1:785263705260:web:2d7daf6fd0ddbd39dcf309"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;