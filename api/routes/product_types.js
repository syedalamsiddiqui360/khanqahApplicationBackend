const express = require("express");
const router = express.Router();

const ProductTypesController = require("../controllers/product_types_controller");

router.get("/",  ProductTypesController.getAll);

router.post("/",  ProductTypesController.create);

router.get("/:id",  ProductTypesController.getOne);

router.put("/:id",  ProductTypesController.update);

router.put("/delete/:id",  ProductTypesController.update);

module.exports = router;
