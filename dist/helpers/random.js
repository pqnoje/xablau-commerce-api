"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generator = require('generate-password');
class RandomHelper {
    constructor() { }
    static generatePassword(length) {
        return generator.generate({
            length,
            numbers: true,
            symbols: true,
            uppercase: false,
            excludeSimilarCharacters: true
        });
    }
}
exports.RandomHelper = RandomHelper;
