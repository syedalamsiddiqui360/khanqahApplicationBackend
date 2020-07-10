const documents = require("../../database/models/documents");

//fetch all documents from document model and send back response
exports.getAllDocuments = async (req, res, next) => {
  try {
    const data = await documents.findAll();
    res.status(200).json(data);
  } catch (e) {
      console.log(e);
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
  }
};

