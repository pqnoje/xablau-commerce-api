"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const https = require('https');
const config = {
    "clusters": {
        "users": "mongodb://localhost:6000/data",
        "auth": "mongodb://localhost:6000/data"
    },
    "tokenSecret": "mylittltinyesecret"
};
const auth_1 = require("../helpers/auth");
class CharacterProvider {
    constructor() {
    }
    static getAll(offset) {
        return new Promise((resolve, reject) => {
            let addr = `https://gateway.marvel.com/v1/public/characters?limit=100&offset=${offset}${auth_1.AuthHelper.getMarvelAuthParameters()}`;
            console.log(addr);
            https.get(addr, (resp) => {
                let data = '';
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    console.log(JSON.parse(data).explanation);
                    resolve(JSON.parse(data).data);
                });
            }).on("error", (err) => {
                console.log("Error: " + err);
                reject(err);
            });
        });
    }
    static getOne(id) {
    }
}
exports.CharacterProvider = CharacterProvider;
