const Sequelize = require("sequelize");
const db = require("../connection");
const bcrypt = require("bcrypt");

const user = db.define(
  "user",
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
    firstname: {
      type: Sequelize.STRING(255),
    },
    lastname: {
      type: Sequelize.STRING(255),
    },
    email: {
      type: Sequelize.STRING(70),
    },
    username: {
      type: Sequelize.STRING(70),
    },
    password: {
      type: Sequelize.STRING(255),
    },
    phone: {
      type: Sequelize.STRING(20),
    },
    vat_number: {
      type: Sequelize.STRING(255),
    },
    company_name: {
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
    tableName: "users",
  }
);
module.exports = user;
