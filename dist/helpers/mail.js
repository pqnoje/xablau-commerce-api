"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
class MailHelper {
    constructor() { }
    static sendMail(to, subject, text, html) {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'user@gmail.com',
                    pass: 'p4sswOrd!'
                }
            });
            transporter.sendMail({
                from: 'user@gmail.com',
                to,
                subject,
                text,
                html
            }, (err, info) => {
                if (err)
                    reject(err);
                resolve(info);
            });
        });
    }
}
exports.MailHelper = MailHelper;
