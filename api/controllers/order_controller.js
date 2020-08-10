const orders = require("../../database/models/orders");

exports.getAll = async (req, res, next) => {
    var language_id=req.body.language_id?req.body.language_id:1;
    //console.log("language_id: "+language_id);
    try {
        const data = await orders.findAll({
            //include: [ "user", "product" ],
        });
        res.send({ data });
    } catch (e) {
        res.statusCode = 300;
        res.send("Please Check log DataBase Error");
        console.log(e);
    }
};
