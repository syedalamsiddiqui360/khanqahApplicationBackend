const products = require("../../database/models/products");
const product_content = require("../../database/models/product_content");
const product_meta = require("../../database/models/product_meta");

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
      .then(async function (data) {
        res.send({ data });
      })
      .error(function (error) {});
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.create = async (req, res, next) => {
  try {
    const data = req.body;
    const product = await products.create(data,{
      include: [ "product_contents", "product_files", "product_meta" ]
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
    inputs.product_contents[0].updatedAt = new Date();
    inputs.product_meta[0].updatedAt = new Date();
    await product_content.update(inputs.product_contents[0], { where: { id: inputs.product_contents[0].id }});
    await product_meta.update(inputs.product_meta[0], { where: { id: inputs.product_meta[0].id }});
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
