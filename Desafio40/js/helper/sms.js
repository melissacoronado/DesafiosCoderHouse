"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = void 0;
const accountSid = 'AC0aa8c3a863c7573372c635b6fcc8ba51';
const authToken = 'f7a332020efb51c14fa65ddfa4c33f04';
const client = require('twilio')(accountSid, authToken);
const sendSMS = (smsOptions) => {
    client.messages
        .create(smsOptions)
        .then((message) => console.log(message.sid))
        .catch(console.log)
        .done();
};
exports.sendSMS = sendSMS;
