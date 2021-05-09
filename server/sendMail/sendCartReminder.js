"use strict";

const User = require("../Models/user");
const formatEmail = require('../sendMail/formatCartReminder');
const send = require('../sendMail/sendActivationLink');
const schedule = require('node-schedule');

console.log("dsfdsf")
async function sendToSub() {
    console.log("hjkhlj")

    const users = await User.find({hasCart: true})
    if (users) {
        for (let i = 0; i < users.length; i++) {
            await send(users[i].email, formatEmail(users[i].cart, users[i].firstName), 'cart')
        }
    }
    else {
        console.log("sdfl")
    }
}
sendToSub().then(r => console.log("esfw"))
/*
const job = schedule.scheduleJob('2 * * * *', async function sendToSub() {
    console.log("hjkhlj")

    const users = await User.find({hasCart:true})
    if (users){
        for (let i = 0;i<users.length;i++){
            await send(users[i].email, formatEmail(users[i].cart, users[i].firstName), 'cart')
        }
    }


});


 */
/*
const date = require('date-and-time')
async function sendEmailAfter24HOURS(){
    const users = User.find();
    const now = new Date();

    for (let i = 0;i<user.length;i++){
        let timeAgo = now - users[i]..date



    }
}

 */
//send(user.email,formatEmail(user.cart),"Your cart at shopmetnorway.no")
