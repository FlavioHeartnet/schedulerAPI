"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var serviceAccount = require('../agendasalaoapi-d9e87e826822.json');
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount)
});
exports.default = firebase_admin_1.default.firestore();
