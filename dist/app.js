"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var firebase_1 = __importDefault(require("./firebase"));
var app = express_1.default();
var port = 3000;
app.get('/', function (req, res) {
    var docRef = firebase_1.default.collection('users').doc('alovelace');
    var setAda = docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    });
    res.json(setAda);
});
app.listen(port, function () { return console.log("{rodando na porta http://localhost:" + port + "/)"); });
