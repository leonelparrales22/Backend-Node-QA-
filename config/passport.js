const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/esquema")

passport.use("local.login", new localStrategy({
    usernameField: "correo",
    passwordField: "pass",
    passReqToCallback: true,
}, async(req, correo, pass, done)=>{
    var objLogin = req.body;
    const Ucorreo = await User.findOne({ correo: objLogin.correo });
    if (Ucorreo) {
        if (Ucorreo.intentos > 2) {
            return done(null, false, req.flash("msg_incorrecto", "Estás bloqueado :) \n sobrepasaste el número de intentos permitidos"));
        } else {
            var equal = await Ucorreo.decryptPass(pass, Ucorreo.passconf);
            if (equal) {
                return done(null, Ucorreo, req.flash("msg_correcto", "Bienvenido " + Ucorreo.name));
            } else {
                return done(null, false,  req.flash("msg_incorrecto", "Contraseña incorrecta :)"));
            }
        }
    } else {
        return done(null, false,  req.flash("msg_incorrecto", "Correo no Existe!! :)"));
    }
}));

passport.serializeUser((user, done)=>{
    //console.log("serializeUser id-> "+ user.id);
    done(null, user.id);//Va .id no me preguntes porq pero va eso >:v
});

passport.deserializeUser((id, done)=>{
    //console.log("Deserialize Use -> "+ id);
    User.findById(id, (err, user)=>{
        done(err, user);
    });
});