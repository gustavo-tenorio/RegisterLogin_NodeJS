const express = require('express');
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



//Banco de dados
const connection = require('./database/database');
const User = require('./Users/User');
connection
    .authenticate()
        .then(
            console.log('Database ON')
        ).catch((Error)=>{
            console.log(Error);
        });

//Rotas
const usersController = require('./Users/UsersController');

app.use('/',usersController);
app.get('/',(req,res)=>{
    res.render('index');
});

app.listen('3000',()=>{
    console.log('Server ON');
});