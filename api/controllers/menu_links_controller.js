const menu_links = require("../../database/models/menu_links");
const menu_link_content = require("../../database/models/menu_link_content");

exports.getAll = async (req, res, next) => {
  try {
    var language_id = req.body.language_id ? req.body.language_id : 1;
    const data = await menu_links.findAll({
        where:{is_active:1},
        include: [
          {
            model: menu_link_content,
            where: { language_id: language_id },
          },          
        ],
      });
    res.send({ data });
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};
