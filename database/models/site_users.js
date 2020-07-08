const Sequelize = require('sequelize')
const db = require('../connection')

const site_users = db.define('site_users', {
 
    id: {
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type:Sequelize.BIGINT(11),
        references: {
            model: 'user', //  refers to table name
            key: 'id', //  refers to column name in reference table
        }
    },
    site_id: {
        type:Sequelize.BIGINT(11),
        references: {
            model: 'site', //  refers to table name
            key: 'id', //  refers to column name in reference table
        }
    }
    
    
}, {
    timestamps: true,
    paranoid: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'site_users'
})
module.exports = site_users;
