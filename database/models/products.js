const Sequelize = require("sequelize");
const db = require("../connection");
const product_files=require("./product_files");
const product_type=require("./product_type");
const product_meta=require("./product_meta");

const products = db.define(
  "products",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    price: {
      type: Sequelize.DOUBLE,
    },
    product_type_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "product_type", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
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
    tableName: "products",
  }
);
products.hasMany(product_meta, { foreignKey: 'product_id' });
products.hasMany(product_files, { foreignKey: 'product_id', as: 'product_files' });
products.belongsTo(product_type, { foreignKey: 'product_type_id' })

module.exports = products;
