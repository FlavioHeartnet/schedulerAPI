"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = require("../firebase");
var BaseDb = /** @class */ (function () {
    function BaseDb() {
    }
    BaseDb.prototype.store = function (data, collection, converter) {
        var docRef = firebase_1.db.collection(collection).withConverter(converter);
        var resp = docRef.add(data).then(function (d) {
            console.log(d.path);
            return true;
        }).catch(function () {
            return false;
        });
        return resp;
    };
    BaseDb.prototype.edit = function (data, collection, doc, converter) {
        var docRef = firebase_1.db.collection(collection).doc(doc).withConverter(converter);
        var resp = docRef.set(data).then(function (d) {
            console.log(d);
            return true;
        }).catch(function () {
            return false;
        });
        return resp;
    };
    BaseDb.prototype.getAllbyCollection = function (collection) {
        return firebase_1.db.collection(collection).get();
    };
    return BaseDb;
}());
exports.default = BaseDb;
