const site_users = require("../../database/models/site_users");

//get all site users data
exports.getAllSiteUsers = async (req, res, next) => {
  try {
    const data = await site_users.findAll();
    res.status(200).json(data);
  } catch (e) {
      console.log(e);
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
  }
};

