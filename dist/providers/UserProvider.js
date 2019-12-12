"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const config = {
    "clusters": {
        "users": "mongodb://localhost:6000/data",
        "auth": "mongodb://localhost:6000/data"
    },
    "tokenSecret": "mylittltinyesecret"
};
const mail_1 = require("../helpers/mail");
class UserProvider {
    constructor() { }
    static createOne(user) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.clusters.users, (err, db) => {
                if (err)
                    reject(err);
                db.collection("users")
                    .insertOne(user, (err, result) => {
                    db.close();
                    if (err)
                        reject(err);
                    resolve(result);
                });
            });
        });
    }
    static getAll() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.clusters.users, (err, db) => {
                if (err) {
                    reject(err);
                }
                else {
                    db.collection("users")
                        .find({})
                        .toArray((err, users) => {
                        db.close();
                        if (err)
                            reject(err);
                        resolve(users);
                    });
                }
            });
        });
    }
    static getOne(id) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.clusters.users, (err, db) => {
                if (err) {
                    reject(err);
                }
                else {
                    db.collection("users")
                        .findOne({
                        "_id": ObjectId(id)
                    }, (err, user) => {
                        db.close();
                        if (err)
                            reject(err);
                        resolve(user);
                    });
                }
            });
        });
    }
    static verifyPassword(id, password) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.clusters.users, (err, db) => {
                if (err) {
                    reject(err);
                }
                else {
                    db.collection("users")
                        .findOne({
                        "_id": ObjectId(id)
                    }, (err, user) => {
                        if (err) {
                            db.close();
                            reject(err);
                        }
                        else if (user.password === password) {
                            resolve();
                        }
                        else {
                            db.close();
                            reject({
                                message: "invalid_password"
                            });
                        }
                    });
                }
            });
        });
    }
    static verifyEmail(email) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.clusters.users, (err, db) => {
                if (err) {
                    reject(err);
                }
                else {
                    db.collection("users")
                        .findOne({
                        "email": email
                    }, (err, user) => {
                        if (err) {
                            db.close();
                            reject(err);
                        }
                        else if (user) {
                            resolve();
                        }
                        else {
                            db.close();
                            reject({
                                message: 'email_not_found'
                            });
                        }
                    });
                }
            });
        });
    }
    static sendRecoverPasswordEmail(email, newPassword) {
        return mail_1.MailHelper.sendMail(email, 'Recover password', `Your new password is: ${newPassword}`, `<p>Your new password is: <b>${newPassword}</b></p>`);
    }
    static changePasswordByEmail(email, newPassword) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.clusters.users, (err, db) => {
                if (err) {
                    reject(err);
                }
                else {
                    db.collection("users")
                        .findOne({ email }, (err, user) => {
                        if (err) {
                            db.close();
                            reject(err);
                        }
                        else {
                            user.password = newPassword;
                            db.collection("users")
                                .update({ email }, user, (err, user) => {
                                db.close();
                                if (err)
                                    reject(err);
                                resolve();
                            });
                        }
                    });
                }
            });
        });
    }
    static changePassword(id, newPassword) {
        let criteria = { "_id": ObjectId(id) };
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.clusters.users, (err, db) => {
                if (err) {
                    reject(err);
                }
                else {
                    db.collection("users")
                        .findOne(criteria, (err, user) => {
                        if (err) {
                            db.close();
                            reject(err);
                        }
                        else {
                            user.password = newPassword;
                            db.collection("users")
                                .update(criteria, user, (err, user) => {
                                db.close();
                                if (err)
                                    reject(err);
                                resolve("password_changed");
                            });
                        }
                    });
                }
            });
        });
    }
}
exports.UserProvider = UserProvider;
