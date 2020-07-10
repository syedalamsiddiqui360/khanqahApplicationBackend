const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const DocumentController = require("../controllers/document_controller");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/all", checkAuth,   DocumentController.getAllDocuments);



module.exports = router;
