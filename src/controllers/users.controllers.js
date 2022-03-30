const UserCtrl = {};

const passport = require('passport');

const User = require('../models/User');

UserCtrl.renderSignUpForm = (req, res) =>{
    res.render('users/signup');
};

UserCtrl.signup = async (req,res)=>{
    const errors = [];
    const {name, email, password, confirm_password} = (req.body);
    if(password!=confirm_password){
        errors.push({text:'Senhas não coincidem!'});
    }
    if(password.length < 4){
        errors.push({text:'A senha deve conter ao menos 4 caracteres!'});
    }
    if(errors.length>0){
        res.render('users/signup',{
            errors,
            name,
            email,
            password,
            confirm_password
        })
    } else{
        const emailUser = await User.findOne({email:email})
        if(emailUser){
            req.flash('error_msg', 'O Email já está em uso');
            res.redirect('/users/signup');
        }else {
            const newUser = new User({name,email,password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg','Registro feito com sucesso!')
            res.redirect('/users/signin'); 
        }
    }
};

UserCtrl.renderSigninForm =(req,res)=>{
    res.render('users/signin');
};

UserCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

UserCtrl.logout = (req,res)=>{
    req.logout();
    req.flash('success_msg', 'Sessão encerrada.');
    res.redirect('/users/signin')
};

module.exports = UserCtrl;