import firebase from "firebase-admin"


const serviceAccount = require('../agendasalaoapi-d9e87e826822.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

export default firebase.firestore();