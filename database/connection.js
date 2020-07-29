require('dotenv').config()
const Sequelize = require('sequelize');

const db= new Sequelize("pdt_develop", "pdt_develop", "rZvWNJleJ4L2", {
  host:"pa813001-001.dbaas.ovh.net",
  port:"35249",
  dialect: 'mysql',
  dialectOptions: {
    timezone: "local",
    dateStrings: true,
      typeCast: true
  },
  "timezone": "Europe/Brussels"
  //timezone: '+05:30' //for writing to database
});
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  db.sync({
    logging:console.log,
    force:false //The "force: true" option for sync will add "DROP TABLE IF EXISTS" to the create statements,
  }).then(()=>{
    console.log("DB sync sucessfull");
  })
  .catch(err => {
    console.error('Unable to sync the database:', err);
  });
  
module.exports=db;
