const Sequelize = require("sequelize");
const db = require("../connection");
const  menu_link_content = require("./menu_link_content");
const  banners = require("./banners");

const menu_links = db.define(
  "menu_links",
  {
    id: {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      primaryKey: true,
    },
    parent_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "menu_links", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
      allowNull:true
    },
    display_order: {
      type: Sequelize.INTEGER,
    },
    is_footer_link: {
      type: Sequelize.BOOLEAN,
      defaultValue:0
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue:1
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
    tableName: "menu_links",
  }
);
menu_links.hasMany(menu_link_content, { foreignKey: 'menu_link_id'});
menu_links.hasMany(banners, { foreignKey: 'menu_link_id'});
module.exports = menu_links;
