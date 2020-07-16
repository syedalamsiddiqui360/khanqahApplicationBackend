const express = require("express");
const router = express.Router();


const LanguagesController = require("../controllers/languages_controller");
//const userRequests = require("../requests/user_requests");

router.post("/",  LanguagesController.getAll);

module.exports = router;
