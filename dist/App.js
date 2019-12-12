"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CharacterRouter_1 = require("./routes/CharacterRouter");
const AuthRouter_1 = require("./routes/AuthRouter");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Marvel API'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1/characters', CharacterRouter_1.default);
        this.express.use('/api/v1/auth', AuthRouter_1.default);
    }
}
exports.default = new App().express;
