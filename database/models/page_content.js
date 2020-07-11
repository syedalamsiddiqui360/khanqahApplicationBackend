const Sequelize = require("sequelize");
const db = require("../connection");

const page_content = db.define(
  "page_content",
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
    page_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "pages", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
    },
    title: {
      type: Sequelize.STRING(255),
    },
    description: {
      type: Sequelize.STRING(1500)
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
    tableName: "page_content",
  }
);

module.exports = page_content;
