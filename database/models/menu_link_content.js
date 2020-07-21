const Sequelize = require("sequelize");
const db = require("../connection");
const menu_links = require("./menu_links");

const menu_link_content = db.define(
  "menu_link_content",
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
    menu_link_id: {
      type: Sequelize.BIGINT(11),
      references: {
        model: "menu_links", //  refers to table name
        key: "id", //  refers to column name in reference table
      },
    },
    title: {
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
    tableName: "menu_link_content",
  }
);

menu_link_content.associate = (models) => {
    menu_link_content.belongsTo(models.menu_links, {foreignKey: 'id', as: 'menu_link'});
};
module.exports = menu_link_content;
