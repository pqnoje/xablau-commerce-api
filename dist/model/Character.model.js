"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
class CharacterModel {
    constructor() { }
    mapper(character) {
        this.company = Number(character.company);
        this.email = character.email;
        this.confirmPassword = character.confirmPassword;
        this.password = character.password;
        this.name = character.name;
        this.phone = character.phone;
    }
}
exports.CharacterModel = CharacterModel;
