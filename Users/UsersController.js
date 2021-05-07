const express = require('express');
const router = express.Router();


const User = require('./User');
const bcrypt = require('bcryptjs');

//Salvando cadastro no banco de dados
router.post('/save',(req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
 
    User.findOne({where:{email:email}}).then(user =>{
        if(user){
            res.render('index',window.alert('Usuário já cadastrado'));
        }else{
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            User.create({
                name:name,
                email:email,
                password:hash
            }).then(res.json({
                name,email,hash
            })).catch((Error)=>{
                res.redirect('/');
            })
            
        }
    });
});
//Login e autenticação
router.post('/authenticate',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({where:{email:email}}).then(user =>{
        if(user === undefined){
            res.redirect('/');
        }else{
            let correct = bcrypt.compareSync(password , user.password);
            if(correct){
                req.session.user ={
                    name: user.name,
                    email: user.email
                }
                res.json(req.session.user);
            }else{
                res.redirect('/');
            }
        }
    });
});
module.exports = router;