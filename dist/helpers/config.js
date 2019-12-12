"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const config = {
    "clusters": {
        "users": "mongodb://localhost:6000/data",
        "auth": "mongodb://localhost:6000/data"
    },
    "tokenSecret": "mylittltinyesecret"
};
class Config {
    constructor() { }
    static config() {
        return config;
    }
}
exports.Config = Config;
