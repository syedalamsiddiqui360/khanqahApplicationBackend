const languages = require("../../database/models/languages");

exports.getAll = async (req, res, next) => {
  try {
    const data = await languages.findAll();
    res.send({ data });
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};
