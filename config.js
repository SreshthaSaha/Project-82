import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyC0yV09gwHL8W5KaBUFFP9CdLUKyapi9m8",
  authDomain: "barter-5e23e.firebaseapp.com",
  projectId: "barter-5e23e",
  storageBucket: "barter-5e23e.appspot.com",
  messagingSenderId: "897437584119",
  appId: "1:897437584119:web:b719603524a8ab9fe9e1f2"
};
    firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();