"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Character_model_1 = require("../model/Character.model");
const token_1 = require("../helpers/token");
const AuthProvider_1 = require("../providers/AuthProvider");
class AuthRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getToken(req, res, next) {
        res.send(token_1.TokenHelper.generatePublic());
    }
    auth(req, res, next) {
        let user = new Character_model_1.CharacterModel();
        user.email = req.body.email;
        user.password = req.body.password;
        AuthProvider_1.AuthProvider.authUser(user)
            .then(token => res.send(token))
            .catch(err => res.status(401).send(err));
    }
    init() {
        this.router.get('/', this.getToken);
        this.router.post('/', this.auth);
    }
}
exports.AuthRouter = AuthRouter;
const authRoutes = new AuthRouter();
authRoutes.init();
exports.default = authRoutes.router;
