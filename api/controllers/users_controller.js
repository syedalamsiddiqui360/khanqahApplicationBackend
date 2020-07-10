const user = require("../../database/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require('dotenv').config()

//get  all users from user model
exports.getAllUsers = async (req, res, next) => {
  try {
    const data = await user.findAll();
    res.send({ data });
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

//it will handle login request
exports.login = (req, res, next) => {
  const errors = validationResult(req); //if errors from user_request.js 
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const { username, password } = req.body;

  user
    .findOne({ where: { username: username } })
    .then(async function (userData) {
      if (!userData) {
        return res.status(401).json({
          message: "Incorrect Username",
        });
      } else {
        resoponse_compare=await bcrypt.compare(password, userData.password);
        if (resoponse_compare) {
          //if password compared successfully, mean users logged in. We will assign him a JWT token that user will use to access protected end points
          const token = jwt.sign(
            {
              id: userData.id,
            },
            process.env.SECRET, //env secret is picked from env file
            {
              expiresIn: "24h",
            }
          );
          return res.status(200).json({
            message: "logged in successfully",
            user: userData,
            token: token,
          });
        }else{
          return res.status(401).json({
            message: "Incorrect Password",
          });
        }
      }
    });
};

//to create a new user
exports.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const encyptPassword = await bcrypt.hash(password, 10); //encrypt password using bcrypt technique
    const data = {
      username: username,
      password: encyptPassword,
    };
    const response = await user.create(data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(401).json({
      message: "Error creating User",
    });
  }
};
