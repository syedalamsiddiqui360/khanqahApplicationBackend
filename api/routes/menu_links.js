const express = require("express");
const router = express.Router();

const MenuLinksController = require("../controllers/menu_links_controller");

router.post("/",  MenuLinksController.getAll);

module.exports = router;
