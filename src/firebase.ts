import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyB9RIEWIRg3iBnL73P_tKfb7WeHvXh1R7Q',
  authDomain: 'agendasalaoapi.firebaseapp.com',
  databaseURL: 'https://agendasalaoapi.firebaseio.com',
  projectId: 'agendasalaoapi',
  storageBucket: 'agendasalaoapi.appspot.com',
  messagingSenderId: '801200537319',
  appId: '1:801200537319:web:cd949258768e00fa51ec42',
}

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
