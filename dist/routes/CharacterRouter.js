"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CharacterProvider_1 = require("../providers/CharacterProvider");
class CharacterRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    getAll(req, res, next) {
        let offset = 0;
        let allCharacters = new Array();
        CharacterProvider_1.CharacterProvider.getAll(offset).then(characters => {
            offset += 100;
            allCharacters.push.apply(allCharacters, characters.results);
            let totalCharacters = characters.total;
            let listOfPromisesToBeFetched = Math.floor(totalCharacters / 100);
            let promises = new Array();
            for (let i = 0; i <= listOfPromisesToBeFetched; i++) {
                promises.push(CharacterProvider_1.CharacterProvider.getAll(offset));
                offset += 100;
            }
            Promise.all(promises).then(allResults => {
                allResults.forEach(characters => {
                    allCharacters.push.apply(allCharacters, characters.results);
                });
                res.send(allCharacters);
            }, err => res.send(err));
        }, err => res.send(err));
    }
    init() {
        this.router.get('/', this.getAll);
    }
}
exports.CharacterRouter = CharacterRouter;
const characterRoutes = new CharacterRouter();
exports.default = characterRoutes.router;
