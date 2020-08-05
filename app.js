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
const productRoutes = require("./api/routes/products");
const languageRoutes = require("./api/routes/languages");
const cmsPageRoutes = require("./api/routes/cms_pages");
const menuLinksRoutes = require("./api/routes/menu_links");
const cartRoutes = require("./api/routes/cart");

app.use(morgan("dev")); // it will log all the requests.
app.use(bodyParser.urlencoded({ extended: true })); // it will handle request body
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
app.use("/products", productRoutes);
app.use("/languages", languageRoutes);
app.use("/page-content", cmsPageRoutes);
app.use("/menu-links", menuLinksRoutes);
app.use("/cart", cartRoutes);

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
