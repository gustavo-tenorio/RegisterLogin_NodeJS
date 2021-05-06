const express = require('express');
const router = express.Router();


const User = require('./User');
const bcrypt = require('bcryptjs');

router.post('/save',(req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
 
    User.findOne({where:{email:email}}).then(user =>{
        if(user){
            res.render('/');
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


module.exports = router;