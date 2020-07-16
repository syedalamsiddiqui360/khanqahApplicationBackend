const pages = require("../../database/models/pages");
const page_content = require("../../database/models/page_content");

exports.getAll = async (req, res, next) => {
  try {
    var language_id = req.body.language_id ? req.body.language_id : 1;
    const data = await pages.findAll({
      include: [
        {
          model: page_content,
          where: { language_id: language_id },
        },
        "page_files",
      ],
    });
    res.send({ data });
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    var language_id = req.body.language_id ? req.body.language_id : 1;
    const data = {};
    pages
      .findOne({
        where: { slug: req.params.slug },
        include: [
          {
            model: page_content,
            where: { language_id: language_id },
          },
          "page_files",
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
