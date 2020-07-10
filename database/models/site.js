const Sequelize = require('sequelize')
const db = require('../connection')
const pov = require('./pov');
const documents = require('./documents');

const site = db.define('site', {
 
    id: {
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type:Sequelize.STRING
    },
    address: {
        type:Sequelize.STRING
    },
    zipcode: {
        type:Sequelize.STRING
    },
    city: {
        type:Sequelize.STRING
    },
    lon: {
        type:Sequelize.DECIMAL(9, 2)
    },
    lat: {
        type:Sequelize.DECIMAL(9, 2)
    },
    poc_name: {
        type:Sequelize.STRING
    },
    poc_email: {
        type:Sequelize.STRING
    },
    poc_telephone: {
        type:Sequelize.STRING
    },
    image: {
        type:Sequelize.STRING
    },
    
    map_image: {
        type:Sequelize.STRING
    },
    map_height: {
        type:Sequelize.DOUBLE
    },
    map_min_height: {
        type:Sequelize.DOUBLE
    },
    map_min_width: {
        type:Sequelize.DOUBLE
    },
    
    
}, {
    timestamps: true,
    paranoid: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'site'
})
site.hasMany(pov, { foreignKey: 'site_id', as: 'views' });
site.hasMany(documents, { foreignKey: 'site_id', as: 'downloads' });
module.exports = site;
