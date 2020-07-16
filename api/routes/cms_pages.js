const express = require("express");
const router = express.Router();

const CmsPagesController = require("../controllers/cms_pages_controller");

router.post("/",  CmsPagesController.getAll);

router.post("/:slug",  CmsPagesController.getBySlug);

module.exports = router;
