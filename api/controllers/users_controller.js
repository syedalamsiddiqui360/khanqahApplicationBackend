const user = require("../../database/models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

//get  all users from user model
exports.getAllUsers = async (req, res, next) => {
  try {
    const data = await user.findAll({ where: {deletedAt: null} });
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
    .findOne({ where: { username: username, deletedAt: null } })
    .then(async function (userData) {
      if (!userData) {
        return res.status(401).json({
          message: "Incorrect Username",
        });
      } else {
        resoponse_compare = await bcrypt.compare(password, userData.password);
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
        } else {
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
    const errors = validationResult(req); //if errors from user_request.js
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    
    const { first_name, last_name, email,password, phone, company_name } = req.body;
    const user_agent = `${req.headers["user-agent"]} `;
    const ip = req.connection.remoteAddress;
    var device_name = "";
    //console.log("here");
    // var OsName = parser(user_agent).os.name;
    // if (OsName === "iOS" || OsName === "Android") {
    //   device_name = OsName;
    // } else if (
    //   OsName === "Windows" ||
    //   OsName === "Linux" ||
    //   OsName === "Mac OS" ||
    //   OsName === "Unix"
    //   ) {
    //     device_name = "computer";
    //   } else {
    //     device_name = "others";
    //   }
    //   const device_data = {
    //     type: user_agent + "|" + ip,
    //     device_name: device_name,
    //   };

    const encyptPassword = await bcrypt.hash(password, 10); //encrypt password using bcrypt technique
    const data = {
      //username: username,
      password: encyptPassword,
      firstname: first_name,
      lastname: last_name,
      phone: phone,
      company_name: company_name
    };
    const response = await user.create(data);
    return res.status(200).json(response);
  } catch (ex) {
    console.log("error creating user",ex);
    return res.status(401).json({
      message: "Error creating User",
      error: ex,
    });
  }
};
exports.getOne = async (req, res, next) => {
  try {
    const {id} = req.params;
    const data = await user.findOne({where: { id: id, deletedAt: null }});
    res.send({ data });
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const {id} = req.params;
    const data = await user.update({deletedAt: new Date()}, { where: { id: id} });
    res.send({ data });
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const inputs = req.body;
    const { id } = req.params;
    inputs.updatedAt = new Date();
    if (inputs.password !== null){
      const encyptPassword = await bcrypt.hash(inputs.password, 10); //encrypt password using bcrypt technique
      inputs.password = encyptPassword;
    }else{
      delete inputs.password;
    }
    const data = await user.update(inputs, { where: { id: id} });
    res.send({ data });
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

