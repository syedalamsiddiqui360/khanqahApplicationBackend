const Sequelize = require("sequelize");
const db = require("../connection");
const cart=require("./cart");
const orders = db.define(
  "orders",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "users", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
    },
    product_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "products", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
    },
    quantity: {
      type: Sequelize.DOUBLE,
    },
    price: {
      type: Sequelize.DOUBLE,
    },
    cart_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "cart", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
    },
    status: {
      type: Sequelize.STRING(255),
    },
  },
  {
    paranoid: true,
    timestamps: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    // define the table's name
    tableName: "orders",
  }
);
module.exports = orders;
