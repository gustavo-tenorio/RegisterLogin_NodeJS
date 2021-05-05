const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('user',{
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

User.sync();

module.exports = User;