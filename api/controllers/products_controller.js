const products = require("../../database/models/products");
const product_content = require("../../database/models/product_content");

exports.getAll = async (req, res, next) => {
  var language_id=req.body.language_id?req.body.language_id:1;
  //console.log("language_id: "+language_id);
  try {
    const data = await products.findAll({
      include: [{
        model: product_content,
        where: {language_id:language_id }
       }, "product_files", "product_meta"],
    });
    res.send({ data });
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getById = async (req, res, next) => {
  try {
    var language_id=req.body.language_id?req.body.language_id:1;
    const data = {};
    products
      .findOne({ where: { id: req.params.id },include: [{
        model: product_content,
        where: {language_id:language_id }
       }, "product_files", "product_meta"], })
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
