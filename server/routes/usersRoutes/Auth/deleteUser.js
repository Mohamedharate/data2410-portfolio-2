"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");

router.delete('/:email', async (req, res) => {
    try {
        await User.deleteOne({email: req.params.email});
        res.json({message: `${req.params.email} has been deleted successfully`});
    } catch (err) {
        res.status(404).json({message: 'The user with the given email address was not found'})
    }
})


router.delete('/allUsers', async (req, res) => {
    try {
        await User.deleteMany();
        res.status(200).json({message: "Deleted all users successfully"})
    } catch (err) {
        res.status(500).json({message: 'Failed to delete all users!'})
    }
});

module.exports = router;