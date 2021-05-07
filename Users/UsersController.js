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
            }).then(res.json(res.redirect('/'))).catch((Error)=>{
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
                res.redirect('/user');
            }else{
                res.redirect('/');
            }
        }
    });
});
//Logout
router.get('/logout',(req,res)=>{
    req.session.user = undefined;
    res.redirect('/')
})
router.get('/user',(req,res)=>{
    let val = req.session.user;
    res.render('../views/User/user',{user:val});
});
router.get('/session',(req,res)=>{
    res.json(req.session.user);
})
module.exports = router;