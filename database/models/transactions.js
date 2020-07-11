const Sequelize = require("sequelize");
const db = require("../connection");

const transactions = db.define(
  "transactions",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "orders", //  refers to table name
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
    tableName: "transactions",
  }
);

module.exports = transactions;
