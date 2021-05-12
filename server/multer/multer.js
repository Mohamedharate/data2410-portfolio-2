"use strict";

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
        cb(null, true);
    } else {
        cb(`${file.originalname} has invalid format ${file.mimetype}.`, false);
    }
}

const upload =
    multer({
        fileFilter: fileFilter,
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5,
        },
    });
module.exports = upload;