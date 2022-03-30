const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done)=> {
    //Match Email's user
    const user = await User.findOne({email})
    if(!user){
        return done(null, false, {message: 'Usuário não encontrado!'})
    }else{
        //Match Password's User
        const match = await user.matchPassword(password)
        if(match){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Senha incorreta'});
        }
    }
}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    })
});