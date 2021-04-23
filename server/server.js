const PORT = process.env.PORT || 3001;
const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const users = require('./routes/users');
const products = require('./routes/products');
const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');

const User = require("./database/userDB");

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

try {
    mongoose.connect("mongodb+srv://haratemo:12345oslomet@webshop.uemit.mongodb.net/webshop?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () =>
        console.log("connected to webshopDB"));
} catch (error) {
    console.log("could not connect to webshopDB");
}

/*
async function main(){
    const uri = "mongodb+srv://haratemo:12345oslomet@webshop.uemit.mongodb.net/webshop?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try{
        await client.connect();
        await listDatabases(client)
        console.log("connected")
    } catch (e){
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);

async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


 */
app.use('/signup',users);
app.use('/addProduct',products);

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

