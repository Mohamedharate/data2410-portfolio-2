"use strict";

const nodemailer = require('nodemailer');


async function send(user, html) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shopmetnorway@gmail.com',
            pass: '12345oslomet'
        }
    });

    const mailOptions = {
        from: 'ShopMet',
        to: `${user.email}`,
        subject: `Order Confirmation`,
        html: `${html}`

    };

    await transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = send