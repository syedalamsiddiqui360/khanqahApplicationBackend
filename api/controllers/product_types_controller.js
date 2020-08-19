const product_type = require("../../database/models/product_type");

exports.getAll = async (req, res, next) => {
    try {
        const data = await product_type.findAll();
        res.send({ data });
    } catch (e) {
        res.statusCode = 300;
        res.send("Please Check log DataBase Error");
        console.log(e);
    }
};

exports.create = async (req, res, next) => {
    const inputs = req.body;
    try {
        const data = await product_type.create(inputs);
        res.send({ data });
    } catch (e) {
        res.statusCode = 300;
        res.send("Please Check log DataBase Error");
        console.log(e);
    }
};

exports.getOne = async (req, res, next) => {
    const product_type_id = req.params;
    try {
        const data = await product_type.findOne({where: {id: product_type_id}});
        res.send({ data });
    } catch (e) {
        res.statusCode = 300;
        res.send("Please Check log DataBase Error");
        console.log(e);
    }
};

exports.update = async (req, res, next) => {
    const { id } = req.params;
    const inputs = req.body;
    inputs.updatedAt = new Date();
    try {
        const updated = await product_type.update(inputs, {where: { id: id }});
        res.send({ updated });
    } catch (e) {
        res.statusCode = 300;
        res.send("Please Check log DataBase Error");
        console.log(e);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product_type = await product_type.update({ deletedAt: new Date() },{ where: { id: id} });
        res.send(product_type);
    } catch (e) {
        res.statusCode = 300;
        res.send("Please Check log DataBase Error");
        console.log(e);
    }
};
