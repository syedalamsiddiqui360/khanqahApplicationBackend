const site = require("../../database/models/site");

// get all states
exports.getAllSites = async (req, res, next) => {
  try {
    const data = await site.findAll(
      {
        attributes: ['id', ['name', 'title'],'address',['zipcode','postalCode'],['poc_name','name'],['poc_email','email'],['poc_telephone','number'],'image','map_image','map_height','map_min_height','map_width','map_min_width'],
        include: ['views','downloads'] //includes will get associated objects of POV and Documents
      
      }
    );
    res.status(200).json(data);
  } catch (e) {
      console.log(e);
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
  }
};

//get single site by ID. ID will be passed via request body.
exports.getById = async (req, res, next) => {
  try {
    var site_id=req.params.id;
    const data = await site.findOne({
      include: ['views','downloads'],
      attributes: ['id', ['name', 'title'],'address',['zipcode','postalCode'],['poc_name','name'],['poc_email','email'],['poc_telephone','number'],'image','map_image','map_height','map_min_height','map_width','map_min_width'],
      where:{
        id:site_id
      }
    });
    res.status(200).json(data);
  } catch (e) {
      console.log(e);
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
  }
};

