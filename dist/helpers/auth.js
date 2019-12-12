"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const md5_typescript_1 = require("md5-typescript");
const PUBLIC_KEY = "c702d9a5fd7a4986452659dfa7f28259";
const PRIVATE_KEY = "c9638037240ea92bd48fd60005f809e3fc30b0c7";
class AuthHelper {
    constructor() { }
    static getMarvelAuthParameters() {
        let ts = new Date().getTime();
        let hash = md5_typescript_1.Md5.init(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`);
        let auth = `&ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
        return auth;
    }
}
exports.AuthHelper = AuthHelper;
