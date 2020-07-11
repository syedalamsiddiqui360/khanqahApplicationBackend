const Sequelize = require("sequelize");
const db = require("../connection");

const product_type = db.define(
  "product_type",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "products", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
    },
    name: {
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
    tableName: "product_type",
  }
);

module.exports = product_type;
