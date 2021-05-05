const express = require('express');
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));


//Banco de dados
const connection = require('./database/database');
const User = require('./User/User');
connection.authenticate()
        .then(
            console.log('Database ON')
            )
            .catch((Error)=>{
                console.log(Error);
            });




        app.get('/',(req,res)=>{
    res.render('index');
});

app.listen('3000',()=>{
    console.log('Server ON');
});