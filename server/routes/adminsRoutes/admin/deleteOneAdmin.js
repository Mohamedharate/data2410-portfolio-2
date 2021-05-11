"use strict";
const express = require("express");
let router = express.Router();
const Admin = require("../../../Models/admin");

router.delete('/:employeeId', async (req, res) => {

    if (req.session) {
        if (req.session.passport && req.session.passport.user.id) {
            const pres = await Admin.findOne({_id: req.session.passport.user.id});
            if (!pres || pres.position !== 'President' || req.session.passport.user.type !== 'Admin') {
                return res.status(403).json({Error: "You don't have permission for this"})
            }
            const admin = await Admin.findOne({employeeId: req.params.employeeId});
            if (!admin) return res.status(404).json({Error: 'The admin with the given ID was not found'})
            let deleted;

            try {
                deleted = await Admin.deleteOne({employeeId: req.params.employeeId});
            } catch (err) {
                return res.status(500).json({Error: "Something went wrong!"})
            }
            if (deleted.deletedCount !== 1) {
                return res.status(500).json({Error: "Something went wrong!"})
            } else {
                return res.status(200).json({Message: "Admin deleted successfully!"})
            }

        } else {
            return res.status(403).json({Error: "You don't have permission for this"})
        }
    } else {
        return res.status(500).json({Error: "Something went wrong!"})
    }
})

module.exports = router;