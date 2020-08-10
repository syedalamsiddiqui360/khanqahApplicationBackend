const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/products_controller");

router.post("/",  ProductController.getAll);

router.post("/create",  ProductController.create);

router.put("/:id",  ProductController.update);

router.put("/delete/:id",  ProductController.delete);

router.post("/:id",  ProductController.getById);

module.exports = router;
