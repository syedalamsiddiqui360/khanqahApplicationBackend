const pov = require("../../database/models/pov");

//fetch all pov views from pov model and send back response
exports.getAllPov = async (req, res, next) => {
  try {
    const data = await pov.findAll();
    res.status(200).json(data);
  } catch (e) {
      console.log(e);
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
  }
};

