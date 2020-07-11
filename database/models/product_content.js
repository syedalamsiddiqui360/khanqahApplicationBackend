const Sequelize = require("sequelize");
const db = require("../connection");

const product_content = db.define(
  "product_content",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    language_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "languages", //  refers to table name
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
    product_meta_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "product_meta", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
    },
    value: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    value_date: {
      type: Sequelize.DATE,
      allowNull: true,
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
    tableName: "product_content",
  }
);

module.exports = product_content;
