// Seller.JS file to maintain every sellers details and storing the resources on AWS

//Including the required packages and assigning it to Local Variables
const router = require('express').Router();
const Product = require('../models/product');

const checkJWT = require('../middlewares/check-jwt');

//Function to handle the product's GET and POST requests by seller
router.route('/products')
  .get(checkJWT, (req, res, next) => {
    Product.find({ owner: req.decoded.user._id })
      .populate('owner')
      .populate('category')
      .exec((err, products) => {
        if (products) {
          res.json({
            success: true,
            message: "Products",
            products: products
          });
        }
      });
  })
  .post((req, res, next) => {
    let product = new Product();
    product.owner = 1;
    product.category = req.body.categoryId;
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.image = req.file.location;
    product.save();
    res.json({
      success: true,
      message: 'Successfully Added the product'
    });
  });




//Exporting the module
module.exports = router;
