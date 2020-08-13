const Sequelize = require("sequelize");
const db = require("../connection");


const banners = db.define(
  "banners",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: Sequelize.STRING(255),
    },
    button_text: {
      type: Sequelize.STRING(255),
    },
    button_link: {
      type: Sequelize.STRING(255),
    },
    display_order: {
      type: Sequelize.INTEGER,
    },
    menu_link_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "menu_links", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
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
    tableName: "banners",
  }
);
module.exports = banners;
