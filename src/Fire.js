import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAmP8DMo4zq8HXROwfyxmEVjvmdKY3rWsE",
    authDomain: "swordfish-e3643.firebaseapp.com",
    databaseURL: "https://swordfish-e3643.firebaseio.com",
    projectId: "swordfish-e3643",
    storageBucket: "swordfish-e3643.appspot.com",
    messagingSenderId: "1006429554309"
  }

  const fire = firebase.initializeApp(config)

export default fire