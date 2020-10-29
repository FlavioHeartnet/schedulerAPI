"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = require("../firebase");
var BaseDb = /** @class */ (function () {
    function BaseDb() {
    }
    BaseDb.prototype.store = function (data, collection) {
        var docRef = firebase_1.db.collection(collection);
        var resp = docRef.add({ data: data }).then(function (d) {
            console.log(d);
            return true;
        }).catch(function () {
            return false;
        });
        return resp;
    };
    BaseDb.prototype.edit = function (data, collection, doc) {
        var docRef = firebase_1.db.collection(collection).doc(doc);
        var resp = docRef.set({ data: data }).then(function (d) {
            console.log(d);
            return true;
        }).catch(function () {
            return false;
        });
        return resp;
    };
    return BaseDb;
}());
exports.default = BaseDb;
