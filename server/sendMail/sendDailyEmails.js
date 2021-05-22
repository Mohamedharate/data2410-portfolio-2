"use strict";

const nodemailer = require('nodemailer');

async function send(arr, item, subject, prod1, prod2) {

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
            attachments: [{
                filename: `${prod1.imageUrl[0].filename}`,
                path: `${prod1.imageUrl[0].path}`,
                cid: 'prod1'
            },
                {
                    filename: `${prod2.imageUrl[0].filename}`,
                    path: `${prod2.imageUrl[0].path}`,
                    cid: 'prod2'
                }],
            subject: `${arr[i].firstName}, ${subject}`,
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