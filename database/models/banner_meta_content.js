const Sequelize = require("sequelize");
const db = require("../connection");

const banner_meta_content = db.define(
  "banner_meta_content",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    banner_meta_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "banner_meta", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
    },
    language_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "languages", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
    },
    title: {
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
    tableName: "banner_meta_content",
  }
);
module.exports = banner_meta_content;
