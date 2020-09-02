const Sequelize = require("sequelize");
const db = require("../connection");
const orders = require("./orders");

const cart = db.define(
  "cart",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "users", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
    },
    
    price: {
      type: Sequelize.DOUBLE,
    },
    status: {
      type: Sequelize.STRING(255),
    },
    quantity: {
      type: Sequelize.DOUBLE,
    },
    promo_code: {
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
    tableName: "cart",

    
  }
);


cart.hasMany(orders, { foreignKey: 'cart_id'});
cart.prototype.calculatePrice =  function() {
   console.log(this.orders);;
};

module.exports = cart;
