const router = require('express').Router();
const async = require('async');

const User = require("../models/user");
router.route('/')
    .get((req, res, next) => {
        User.find({}, (err, users) => {
            res.json({
                success: true,
                message: "Success",
                users: users
            })
        });
    });

module.exports = router;
