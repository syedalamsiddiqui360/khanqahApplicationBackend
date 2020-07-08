const express = require("express");
const router = express.Router();


const checkAuth = require("../middleware/check-auth");

const SitesController = require("../controllers/sites_controller");

//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/all", checkAuth,   SitesController.getAllSites);

router.post("/show/:id", checkAuth,   SitesController.getById);



module.exports = router;
