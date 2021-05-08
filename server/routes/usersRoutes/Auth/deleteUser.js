"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");

router.delete('/:email', async (req, res) => {

    if (req.session) {
        if (req.session.passport) {
            const user = await User.findOne({email: req.params.email});
            if (!user) return res.status(404).json({Error: 'The user with the given email address was not found'})
            if (user._id === req.session.passport.user.id || req.session.passport.user.type === 'Admin') {
                await User.deleteOne({email: req.params.email});
            } else {
                return res.status(403).json({Error: "You don't have permission for this"})
            }
        } else {
            return res.status(403).json({Error: "You don't have permission for this"})
        }
    } else {
        res.status(500).json({Error: "Something went wrong!"})
    }

})

router.delete('/allUsers', async (req, res) => {
    if (req.session.passport) {
        if (req.session.passport.user.type === 'Admin') {
            const adminWithPermission = await Admin.findOne({_id: req.session.passport.user.id})
            if (adminWithPermission) {
                if (adminWithPermission.position === 'President') {
                    try {
                        await User.deleteMany();
                        res.status(200).json({message: "Deleted all users successfully"})
                    } catch (err) {
                        res.status(500).json({Error: 'Failed to delete all users!'})
                    }
                } else {
                    return res.status(403).json({Error: "You don't have permission for this"})
                }
            } else {
                return res.status(404).json({Error: "User not found!"})
            }
        } else {
            return res.status(403).json({Error: "You don't have permission for this"})
        }
    } else {
        res.status(500).json({Error: "Something went wrong!"})
    }

});

module.exports = router;