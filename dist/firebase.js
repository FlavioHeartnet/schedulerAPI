"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var firebase_1 = __importDefault(require("firebase"));
require("firebase/auth");
var serviceAccount = require('../agendasalaoapi-d9e87e826822.json');
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount)
});
var firebaseConfig = {
    apiKey: "AIzaSyB9RIEWIRg3iBnL73P_tKfb7WeHvXh1R7Q",
    authDomain: "agendasalaoapi.firebaseapp.com",
    databaseURL: "https://agendasalaoapi.firebaseio.com",
    projectId: "agendasalaoapi",
    storageBucket: "agendasalaoapi.appspot.com",
    messagingSenderId: "801200537319",
    appId: "1:801200537319:web:cd949258768e00fa51ec42"
};
firebase_1.default.initializeApp(firebaseConfig);
exports.auth = firebase_1.default.auth();
exports.db = firebase_admin_1.default.firestore();
