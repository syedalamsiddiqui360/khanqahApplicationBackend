const products = require("../../database/models/products");
const { validationResult } = require("express-validator");

//get  all users from user model
exports.getAll = async (req, res, next) => {
  try {
    const data = await products.findAll();
    res.send({ data });
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const data = {};
    products.findOne({ where: { id: id } })
    .then(async function (response) {
        data=response;
    }).error(function (error) {
        
    });    
    res.send({ data });
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};


