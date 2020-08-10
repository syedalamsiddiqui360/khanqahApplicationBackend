const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/order_controller");

router.get("/",  OrderController.getAll);

module.exports = router;
