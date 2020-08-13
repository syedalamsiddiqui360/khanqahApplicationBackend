const products = require("../../database/models/products");
const product_content = require("../../database/models/product_content");
const product_meta = require("../../database/models/product_meta");
const sequelize = require("../../database/connection");

exports.getAll = async (req, res, next) => {
  var language_id = req.body.language_id ? req.body.language_id : 1;
  //console.log("language_id: "+language_id);
  try {
    const data = await products.findAll({
      include: [
        {
          model: product_content,
          where: { language_id: language_id },
        },
        "product_files",
      ],
    });
    res.send({ data });
  } catch (e) {
    console.log(e);
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
  }
};

exports.getById = async (req, res, next) => {
  try {
    var language_id = req.body.language_id ? req.body.language_id : 1;
    const data = {};
    products
      .findOne({
        where: { id: req.params.id },
        include: [
          {
            model: product_content,
            where: { language_id: language_id },
          },
          "product_files",
        ],
      })
      .then(async function (response) {
        res.send({ response });
      })
      .error(function (error) {});
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getFilters = async (req, res, next) => {
  console.log("GET FILTERS PAGE");
  
  try {
    var language_id = req.body.language_id ? req.body.language_id : 1;
    const data = {};
    var query=`SELECT DISTINCT(title) FROM product_meta ORDER BY title`;
    
    
    await sequelize
    .query(query, { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {
      console.log("records",records);
      //res.statusCode = 200;
      data.records=records;
      return res.send(data.records);
    })
    .catch((err) => {
      console.log("ERROR IN FETCHING DATA",err);
    });
  } catch (e) {
    console.log(e);
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
  }
};
