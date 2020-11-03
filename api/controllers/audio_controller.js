const audio = require("../../database/models/audio");
const path = require('path');
const { body } = require("express-validator");
const { title } = require("process");



exports.post = async (req, res, next) => {
  var file = req.files.file
  var fileName = new Date() + file.name

  const data = {
    name: req.body.name,
    title: req.body.title,
    fileName: fileName,
    place: req.body.place,
    date: req.body.date,
    category_id: req.body.category,
    islamiDate: req.body.islamiDate,
    description: req.body.description,
  }
  console.log(req.files)
  console.log(req.body)
  try {

    if (file != null) {
      file.mv(__dirname + "/uploads/audio/" + fileName, async function (err) {
        if (err) {
          res.send(err);
        }
        else {
          const output = await audio.create(data)
          res.send("file uploaded");
        }
      })
    }
    else {
      res.statusCode = 300;
      res.send("Please Check log DataBase Error");
      console.log("file is null");
    }
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.get = async (req, res, next) => {
  try {
    var { fileName } = req.params;

    var filePath = path.join(__dirname, "/uploads/audio/" + fileName);
    res.sendFile(filePath)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.download = async (req, res, next) => {
  try {
    var fileName = req.body.fileName
    var filePath = path.join(__dirname, "/uploads/audio/" + fileName);
    res.download(filePath);
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAll = async (req, res, next) => {
  let output = [];
  let count = 0;
  const { type_id, offset, limit } = req.body
  const data = {
    offset: offset,
    limit: limit,
    type_id:type_id,
  }
  try {
    await audio.findAndCountAll({
      offset: data.offset,
      limit: data.limit
    })
      .then(function (result) {
        count = result.count;
        output = result.rows;
      });

    res.send({ data: output, length: count })
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};


exports.getAllByCategory = async (req, res, next) => {
  let output = [];
  let count = 0;
  const { category_id, offset, limit } = req.body
  const data = {
    category_id: category_id,
    offset: offset,
    limit: limit
  }
  try {
    await audio.findAndCountAll({
      offset: data.offset,
      limit: data.limit,
      where: { category_id: category_id, deletedAt: null }
    })
      .then(function (result) {
        count = result.count;
        output = result.rows;
      });
    res.send({ data: output, length: count })
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByPerson = async (req, res, next) => {
  try {
    const person_id = req.body.person_id
    // console.log(person)

    const data = await audio.findAll({ where: { person_id: person_id, deletedAt: null } })

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByCategory = async (req, res, next) => {
  try {
    const category_id = req.body.category_id
    // console.log(category)

    const data = await audio.findAll({ where: { category_id: category_id, deletedAt: null } })

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByPersonAndcategory = async (req, res, next) => {
  try {
    const person_id = req.body.person_id
    const category_id = req.body.category_id
    // console.log(person)

    const data = await audio.findAll({ where: { person_id: person_id, category_id: category_id, deletedAt: null } })

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByTypeAndPerson = async (req, res, next) => {
  try {
    const person_id = req.body.person_id
    const type_id = req.body.type_id
    // console.log(person)

    const data = await audio.findAll({ where: { person_id: person_id, type_id: type_id, deletedAt: null } })

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByTypeAndcategory = async (req, res, next) => {
  try {
    const type_id = req.body.type_id
    const category_id = req.body.category_id
    // console.log(type)

    const data = await audio.findAll({ where: { type_id: type_id, category_id: category_id, deletedAt: null } })

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.getAllByTypeAndPersonAndcategory = async (req, res, next) => {
  try {
    const person_id = req.body.person_id
    const category_id = req.body.category_id
    const type_id = req.body.type_id

    const data = await audio.findAll({ where: { type_id: type_id, person_id: person_id, category_id: category_id, deletedAt: null } })

    res.send(data)
  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};