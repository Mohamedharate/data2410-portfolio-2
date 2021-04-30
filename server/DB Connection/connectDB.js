const mongoose = require("mongoose");


// ------- connect to mongodb ---------- //
try {
    mongoose.connect("mongodb+srv://haratemo:12345oslomet@webshop.uemit.mongodb.net/webshop?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, () =>
        console.log("connected to webshopDB"));
} catch (error) {
    console.log("could not connect to webshopDB");
}