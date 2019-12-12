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
class TokenHelper {
    constructor() { }
    static verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.tokenSecret, (err, decoded) => {
                if (err)
                    reject(err);
                resolve(decoded);
            });
        });
    }
    static verifyCustom(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.tokenSecret, (err, decoded) => {
                if (err)
                    reject(err);
                resolve(decoded);
            });
        });
    }
    static generatePublic() {
        return jwt.sign({ access: 'public' }, config.tokenSecret, { expiresIn: '1d' });
    }
    static generatePrivate() {
        return jwt.sign({ access: 'private' }, config.tokenSecret, { expiresIn: '1d' });
    }
    static generateCustom(customObject, expirationTime) {
        return jwt.sign(customObject, config.tokenSecret, { expiresIn: expirationTime });
    }
}
exports.TokenHelper = TokenHelper;
