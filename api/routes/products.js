const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/products_controller");

router.post("/",  ProductController.getAll);

router.get("/",  ProductController.get);

router.post("/show/:id",  ProductController.getById);

router.post("/filters_list",  ProductController.getFilters);

router.post("/create",  ProductController.create);

router.put("/:id",  ProductController.update);

router.put("/delete/:id",  ProductController.delete);

module.exports = router;
