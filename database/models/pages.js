const Sequelize = require("sequelize");
const db = require("../connection");
const page_content = require("./page_content");
const page_files = require("./page_files");

const pages = db.define(
  "pages",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(255),
    },
    slug: {
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
    tableName: "pages",
  }
);
pages.hasMany(page_content, { foreignKey: 'page_id'});
pages.hasMany(page_files, { foreignKey: 'page_id', as: 'page_files' });
module.exports = pages;
