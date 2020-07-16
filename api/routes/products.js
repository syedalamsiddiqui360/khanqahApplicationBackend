const express = require("express");
const router = express.Router();


const checkAuth = require("../middleware/check-auth");
const ProductController = require("../controllers/products_controller");
//const userRequests = require("../requests/user_requests");


router.post("/",  ProductController.getAll);


router.post("/:id",  ProductController.getById);


module.exports = router;
