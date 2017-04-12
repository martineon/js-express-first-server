/* var Sequelize = require('sequelize');

// db config
var config = require('./databse.json')[env];
var password = config.password ? config.password : null;

// initialize database connection
var sequelize = new Sequelize(
  config.database,
  config.user,
  config.password, {
    dialect: config.driver,
    logging: console.log,
    define : {
      timestamps: false
    }
  }
);

sequelize
        .authenticate()
        .then(function(err){
                      console.log('Connection has been established successfully.');
        }, function(err){
                      console.log('Unable to connect to the database:', err);
        });
  module.exports = sequelize;

  //le fichier config est un ficher json

  {
    "dev": {
      "driver":"",
      "user":"",
      "database":"",
      "password":""
    }
  }
