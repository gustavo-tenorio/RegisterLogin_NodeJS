const Sequelize = require('sequelize');

const connection = new Sequelize('register_login','root','110804',{
    host:'localhost',
    dialect:'mysql',
    timezone:'-03:00'
});


module.exports = connection;