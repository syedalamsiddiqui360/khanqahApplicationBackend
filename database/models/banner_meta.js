const Sequelize = require("sequelize");
const db = require("../connection");

const banner_meta = db.define(
  "banner_meta",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    banner_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "banners", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
    },
    link: {
      type: Sequelize.STRING(255),
    },
    parent: {
      type: Sequelize.STRING(255),
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
    tableName: "banner_meta",
  }
);
module.exports = banner_meta;
