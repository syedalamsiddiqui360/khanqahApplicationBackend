const express = require("express");
const router = express.Router();


const checkAuth = require("../middleware/check-auth");

const SiteUsersController = require("../controllers/site_users_controller");

//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/all", checkAuth,   SiteUsersController.getAllSiteUsers);



module.exports = router;
