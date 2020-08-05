const express = require("express");
const router = express.Router();

var multer  = require('multer')
var upload = multer()


const cartRequests = require("../requests/cart_request");

const CartController = require("../controllers/cart_controller");

router.post("/get_cart_items",   CartController.getCartByID);
router.post("/add_to_cart", cartRequests.addToCart,  CartController.addToCart);
router.put("/update_cart_quantity", cartRequests.updateCartQuantity , CartController.updateCartQuantity);
router.delete("/delete_cart_item", cartRequests.deleteCartItem,  CartController.deleteCartItem);
router.get("/checkout",   CartController.checkout);
router.all("/receive-payment-response", upload.none(),  CartController.receivePaymentResponse);


// router.all('/profile', upload.none(), function (req, res, next) {
//     res.send(req.body);
//   })


module.exports = router;
