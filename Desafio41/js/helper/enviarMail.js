"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendGMail = exports.sendMail = void 0;
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ona51@ethereal.email',
        pass: 'HXyTCfBdVMgTZhVfF4'
    },
    tls: { rejectUnauthorized: false }
});
const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(`error transporter.sendMail: ${err}`);
            return err;
        }
        //console.log(info)
    });
};
exports.sendMail = sendMail;
const transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'melcg23@gmail.com',
        pass: '******'
    },
    tls: { rejectUnauthorized: false }
});
const sendGMail = (mailOptions) => {
    //console.log('sendGMail')
    transporterGmail.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(`error transporter.sendGMail: ${err}`);
            return err;
        }
        //console.log(info)
    });
};
exports.sendGMail = sendGMail;
