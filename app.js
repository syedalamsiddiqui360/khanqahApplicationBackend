const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const model = require("./database/models/model");

var swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./api/swagger/swagger.json");

var customSwaggerOptions = {
  explorer: true,
  swaggerOptions: {
    authAction: {
      JWT: {
        name: "JWT",
        schema: {
          type: "apiKey",
          in: "header",
          name: "x-access-token",
          description: "",
        },
        value:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNTkyNTYyMDU3LCJleHAiOjE1OTI2NDg0NTd9.uyZxziVwMNL1vyf-EgC8_2mKebKM-rCSgX8_5bBKhvk",
      },
    },
  },
};
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, customSwaggerOptions)
);


const userRoutes = require("./api/routes/user");
const siteRoutes = require("./api/routes/site");
const povRoutes = require("./api/routes/pov");
const documentsRoutes = require("./api/routes/documents");
const siteUsersRoutes = require("./api/routes/site_users");

app.use(morgan("dev")); // it will log all the requests.
app.use(bodyParser.urlencoded({ extended: false })); // it will handle request body
app.use(bodyParser.json()); // it will handle request body

//handling cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,PATCH");
    return res.status(200).json({});
  }
  next();
});


app.use("/user", userRoutes);
app.use("/site", siteRoutes);
app.use("/pov", povRoutes);
app.use("/documents", documentsRoutes);
app.use("/site_users", siteUsersRoutes);

// //error handling
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({
    error: {
      message: error.message,
      code: error.status,
    },
  });
});


module.exports = app;
