"use strict";

const User = require("../Models/user");
const formatEmail = require('../sendMail/formatCartReminder');
const send = require('./sendEmailGen');
const schedule = require('node-schedule');

const job = schedule.scheduleJob('55 12 19 * * 5', async function sendToSub() {

    const users = await User.find({hasCart:true})
    if (users){

        for (let i = 0;i<users.length;i++){
            if (users[i].cart.length > 0){
                await send(users[i].email, formatEmail(users[i].cart, users[i].firstName), 'Your Cart at ShopMet')
            }
        }
    }
});