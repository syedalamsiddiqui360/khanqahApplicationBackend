const express = require("express");
const router = express.Router();


const checkAuth = require("../middleware/check-auth");
const UsersController = require("../controllers/users_controller");
const userRequests = require("../requests/user_requests");


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/",   checkAuth, UsersController.getAllUsers);

//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.get("/:id",   checkAuth, UsersController.getOne);

//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.put("/delete/:id",   checkAuth, UsersController.delete);

//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.put("/:id",   checkAuth, UsersController.update);

//checkAuth IS NOT ASSIGNED TO THE ROUTE BECAUSE ITS A PUBLIC ROUTE AND MUST BE ACCESSABLE WITHOUT TOKEN SO USER CAN LOGIN
router.post("/login", userRequests.loginRequest, UsersController.login);


//checkAuth IS ASSIGNED TO THE ROUTE AS MIDDLEWARE BECAUSE ITS A PROTECTED ROUTE AND MUST PASS TOKEN VERIFICATION
router.post("/sign_up",  userRequests.signUpRequest ,  UsersController.createUser);

module.exports = router;
