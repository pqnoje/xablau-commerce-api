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
        CharacterProvider_1.CharacterProvider.getAll(offset)
            .then(result => {
            offset += 100;
            let totalCharacters = result.data.total;
            allCharacters.push.apply(allCharacters, result.data.results);
            res.send(allCharacters);
            console.log('first loop');
            while (allCharacters.length < totalCharacters) {
                console.log('offset =>', offset);
                if (allCharacters.length >= totalCharacters) {
                    res.send(allCharacters);
                }
                else {
                    CharacterProvider_1.CharacterProvider.getAll(offset).then(result => {
                        offset += 100;
                        allCharacters.push.apply(allCharacters, result.data.results);
                    });
                }
            }
        })
            .catch(err => res.status(401).send(err));
        /* CharacterProvider.getAll()
          .then(characters => res.send(characters))
          .catch(err => res.status(401).send(err)) */
    }
    getOne(req, res, next) {
        let id = req.params.id;
        /* CharacterProvider.getOne(id)
          .then(user => res.send(user))
          .catch(err => res.status(401).send(err)) */
    }
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
    }
}
exports.CharacterRouter = CharacterRouter;
const userRoutes = new CharacterRouter();
userRoutes.init();
exports.default = userRoutes.router;
