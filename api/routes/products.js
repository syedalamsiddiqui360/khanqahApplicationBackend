const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/products_controller");

router.post("/",  ProductController.getAll);

router.post("/show/:id",  ProductController.getById);

router.post("/filters_list",  ProductController.getFilters);

module.exports = router;
