const Sequelize = require("sequelize");
const db = require("../connection");

const page_files = db.define(
  "page_files",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    page_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "pages", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
    },
    title: {
      type: Sequelize.STRING(255),
    }
  },
  {
    paranoid: true,
    timestamps: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    // define the table's name
    tableName: "page_files",
  }
);

module.exports = page_files;
