const Sequelize = require('sequelize')
const db = require('../connection')

const pov = db.define('pov', {
 
    id: {
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true
    },
    site_id: {
        type:Sequelize.BIGINT(11),
        references: {
            model: 'site', //  refers to table name
            key: 'id', //  refers to column name in reference table
        }
    },
    picture: {
        type:Sequelize.STRING
    },
    url: {
        type:Sequelize.STRING
    },
    top: {
        type:Sequelize.DOUBLE
    },
    left: {
        type:Sequelize.DOUBLE
    }  
    
}, {
    timestamps: true,
    paranoid: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'pov'
})
module.exports = pov;
