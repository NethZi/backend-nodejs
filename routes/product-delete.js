var express = require('express');
var router = express.Router();
var multer  = require('multer');

const Gallery = require("../models/product.js");

router.get('/:id', function(req, res, next) {
    Gallery.findByIdAndDelete(req.params.id, function (err, gallery) {
        if (err) return next(err);

    });

    res.json({
        success: true,
        message: 'Successfully Added the product'
    });
})

//Exporting the module
module.exports = router;