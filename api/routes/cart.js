const express = require("express");
const router = express.Router();

const cartRequests = require("../requests/cart_request");

const CartController = require("../controllers/cart_controller");

router.post("/get_cart_items",   CartController.getCartByID);
router.post("/add_to_cart", cartRequests.addToCart,  CartController.addToCart);
router.put("/update_cart_quantity", cartRequests.updateCartQuantity , CartController.updateCartQuantity);
router.delete("/delete_cart_item", cartRequests.deleteCartItem,  CartController.deleteCartItem);
router.post("/checkout",   CartController.checkout);
router.post("/receive-payment-response",  CartController.receivePaymentResponse);
router.get("/complete", (req,res)=>{
  res.status(200).json({
    message: "Successful.",
  });
});





module.exports = router;
