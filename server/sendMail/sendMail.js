"use strict";

const nodemailer = require('nodemailer');


async function send(arr, item, subject) {

    for (let i = 0; i < arr.length; i++) {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shopmetnorway@gmail.com',
                pass: '12345oslomet'
            }
        });

        const mailOptions = {
            from: 'ShopMet',
            to: `${arr[i].email}`,
            subject: `Check out our ${subject}`,
            html: `${item}`
        };

        await transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }


}

module.exports = send