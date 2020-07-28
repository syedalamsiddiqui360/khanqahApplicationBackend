const {check} = require('express-validator');
//VALIDATION FOR CART REQUESTs

exports.addToCart = [
    check('user_id', 'User ID is required.').isLength({ min: 1}),
    check('product_id', 'Product ID is required.').isLength({ min: 1}),
    check('quantity', 'Quantity is required.').isLength({ min: 1}),
]

exports.updateCartQuantity = [
    check('order_id', 'Please select cart item to change quantity.').isLength({ min: 1}),
    check('user_id', 'User ID is required.').isLength({ min: 1}),
    check('quantity', 'Quantity is required.').isLength({ min: 1}),
]

exports.deleteCartItem = [
    check('order_id', 'Please select cart item to change quantity.').isLength({ min: 1}),
    check('user_id', 'User ID is required.').isLength({ min: 1}),
]
  