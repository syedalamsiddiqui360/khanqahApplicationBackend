const express = require("express");
const router = express.Router();


const checkAuth = require("../middleware/check-auth");

const PovController = require("../controllers/pov_controller");

//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/all", checkAuth,   PovController.getAllPov);



module.exports = router;
