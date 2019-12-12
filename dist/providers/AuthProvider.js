"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const config = {
    "clusters": {
        "users": "mongodb://localhost:6000/data",
        "auth": "mongodb://localhost:6000/data"
    },
    "tokenSecret": "mylittltinyesecret"
};
const token_1 = require("../helpers/token");
class AuthProvider {
    constructor() { }
    static authUser(currentUser) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.clusters.users, (err, db) => {
                if (err)
                    reject(err);
                db.collection("users")
                    .findOne({ email: currentUser.email }, (err, user) => {
                    if (err)
                        reject(err);
                    if (user.password === currentUser.password)
                        resolve({ access_token: token_1.TokenHelper.generatePrivate() });
                    reject("invalid_password");
                });
            });
        });
    }
}
exports.AuthProvider = AuthProvider;
