const orders = require("../../database/models/orders");

exports.getAll = async (req, res, next) => {
    try {
        const data = await orders.findAll({
            //include: [ "users", "products" ],
        });
        res.send({ data });
    } catch (e) {
        res.statusCode = 300;
        res.send("Please Check log DataBase Error");
        console.log(e);
    }
};
