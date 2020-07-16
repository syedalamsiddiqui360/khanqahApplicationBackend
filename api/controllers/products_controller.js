const products = require("../../database/models/products");

exports.getAll = async (req, res, next) => {
  try {
    const data = await products.findAll({
      include: ["product_content", "product_files", "product_meta"],
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
    const data = {};
    products
      .findOne({ where: { id: req.params.id },include: ['product_content','product_files','product_meta'] })
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
