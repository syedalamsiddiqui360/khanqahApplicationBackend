const products = require("../../database/models/products");
const product_meta = require("../../database/models/product_meta");
const sequelize = require("../../database/connection");

exports.getAll = async (req, res, next) => {
  var language_id = req.body.language_id ? req.body.language_id : 1;
  //console.log("language_id: "+language_id);
  try {
    const data = await products.findAll({
      include: [
        {
          model: product_meta,
          where: { language_id: language_id },
        },
        "product_files","product_type"
      ],
    });
    res.send({ data });
  } catch (e) {
    console.log(e);
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
  }
};

exports.getFilteredProducts = async (req, res, next) => {
  var language_id = req.body.language_id ? req.body.language_id : 1;
  //console.log("language_id: "+language_id);

  var whereStatement = {};
  if(req.body.product_type_id){
    whereStatement.product_type_id = req.body.product_type_id;
  }
      
  // if(searchParams.username){
  //   whereStatement.username = {$like: '%' + searchParams.username + '%'};
  // }
      
  try {
    const data = await products.findAll({
      where:whereStatement,
      include: [
        {
          model: product_meta,
          where: { language_id: language_id },
        },
        "product_files","product_type"
      ],
    });
    res.send({ data });
  } catch (e) {
    console.log(e);
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
  }
};

exports.get = async (req, res, next) => {
  try {
    const data = await products.findAll({
      include: [
        "product_files","product_type", "product_meta"
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
    //var language_id = req.body.language_id ? req.body.language_id : 1;
    const data = {};
    products
      .findOne({
        where: { id: req.params.id },
        include: [
          /*{
            model: product_meta,
            where: { language_id: language_id },
          },*/
          "product_files","product_type",product_meta
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

exports.create = async (req, res, next) => {
  try {
    const data = req.body;
    const product = await products.create(data,{
      include: ["product_files", "product_meta" ]
    });
    res.send(product);
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
    const updated = await products.update(inputs, { where: { id: id }});
    inputs.product_meta.map((meta)=>{
      product_meta.update(meta, { where: { id: meta.id }});
    });
    res.send(updated);
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await products.update({ deletedAt: new Date() },{ where: { id: id} });
    res.send(product);
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};
