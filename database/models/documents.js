const Sequelize = require('sequelize')
const db = require('../connection')

const documents = db.define('documents', {
 
    id: {
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true
    },
    pov_id: {
        type:Sequelize.BIGINT(11),
        references: {
            model: 'pov', //  refers to table name
            key: 'id', //  refers to column name in reference table
        }
    },
    site_id: {
        type:Sequelize.BIGINT(11),
        references: {
            model: 'site', //  refers to table name
            key: 'id', //  refers to column name in reference table
        }
    },
    title: {
        type:Sequelize.STRING
    },
    file: {
        type:Sequelize.STRING
    }
    
    
}, {
    timestamps: true,
    paranoid: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'documents'
})
module.exports = documents;
