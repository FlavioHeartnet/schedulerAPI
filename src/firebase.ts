import firebase from "firebase-admin"
import fr from "firebase"
import "firebase/auth"


const serviceAccount = require('../keyfile.json');
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
})
const firebaseConfig = {
  apiKey: "AIzaSyB9RIEWIRg3iBnL73P_tKfb7WeHvXh1R7Q",
  authDomain: "agendasalaoapi.firebaseapp.com",
  databaseURL: "https://agendasalaoapi.firebaseio.com",
  projectId: "agendasalaoapi",
  storageBucket: "agendasalaoapi.appspot.com",
  messagingSenderId: "801200537319",
  appId: "1:801200537319:web:cd949258768e00fa51ec42"
};

fr.initializeApp(firebaseConfig)

export const auth = fr.auth()
export const db = firebase.firestore();
