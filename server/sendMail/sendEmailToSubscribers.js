"use strict";
const schedule = require('node-schedule');
const User = require("../Models/user");
const send = require('./sendDailyEmails');
const formatDailyEmail = require('./formatDailyEmail');

const Product = require("../Models/product");

function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}

schedule.scheduleJob('42 17 * * *', async function sendToSub() {

    const products = await Product.find();
    const prod1 = random_item(products);
    let prod2 = random_item(products);

    while (prod1 === prod2) {
        prod2 = random_item(products);
    }

    if (prod1 && prod2) {
        const users = await User.find({subscriber: true});
        await send(users, formatDailyEmail(prod1, prod2), `It's time to get started `,prod1,prod2)
    }
});