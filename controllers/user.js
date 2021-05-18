const { response, request, query } = require("express");
const User = require("../models/esquema");

const loginGet = (req = request, res = response) => {
    res.render("login");
};

const loginMed = async(req = request, res = response) => {
    var objLogin = req.body;
    try {
        const correo = await User.findOne({ correo: objLogin.correo });
        if(correo.intentos > 3){
            req.flash("msg_incorrecto", "Estas bloqueado :) \n sobrepasaste el numero de intentos permitidos");
            res.redirect("/login");
        }else{
            if (correo) {
                var equal = await correo.decryptPass(objLogin.pass, correo.passconf);
                //console.log("Reg Usuario\n" + correo);
                var id = encodeURIComponent(correo._id);
                if (equal) {
                    req.flash("msg_correcto", "Bienvenido "+correo.name);
                    res.redirect("/loginPregunta?id="+id);
                } else {
                    req.flash("msg_incorrecto", "Contraseña incorrecta :)");
                    res.redirect("/login");
                }
            } else {
                req.flash("msg_incorrecto", "Correo no Existe!! :)");
                res.redirect("/login");
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const loginPregunta = (req = request, res = response) =>{
    var id = req.query.id;
    var text = "";
    var head = "";
    var bool = false;
    var rand = Math.floor(Math.random() * (5 - 0)); //0 a 4
    if(rand == 0){
        text += "¿Qué país te gustaría conocer?";
        head = "pais";
    }
    if(rand == 1){
        text += "¿Cuál es tu color favorito?";
        head = "color";
    }
    if(rand == 2){
        text += "¿Cuál es tu serie o película favorita?";
        head = "peli_serie";
    }
    if(rand == 3){
        text += "¿Cuál clima es tu favorito?";
        head = "clima";
        bool = true;
    }
    if(rand == 4){
        text += " ¿A qué colegio fuiste?";
        head = "cole";
    }
    res.render("loginPregunta",{
        bool,
        preg: text,
        head,
        id
    });
    //res.send("Ok validaciones completadas!!\nPregunta: " + text + "\npregunta base: "+head + "\n id_User: "+id);
};

const loginPost = async(req = request, res = response) => {
    /*console.log(req.params);
    console.log(req.body);*/
    var user = await User.findById(req.params.id);
    var intentos = user.intentos;
    if(intentos < 4){
        //console.log(user);
        var mipregunta = Object.keys(req.body)[0];
        if(req.body[mipregunta] === user[mipregunta]){
            var resp = await User.findOneAndUpdate(req.params.id, {intentos: 0});
            req.flash("msg_correcto", "Si que es usted !! :)\n Bienvenido "+user.name+"!");
            res.redirect("/user");
        }else{
            intentos ++;
            F = 3-intentos;
            if (F < 0 ){
                req.flash("msg_incorrecto", "Lo sentimos se te a bloqueado el acceso!");
            }
            else if (F == 0){
                req.flash("msg_incorrecto", "Es tu última oportunidad: "+ (F) + " intentos, tu cuenta quedará  bloqueada por 48 horas :)");
            }
            else if (F == 1){
                req.flash("msg_incorrecto", "Recuerda ingesar la repuesta tal cual ingresaste en el registro(Mayusculas, tildes, espacios): "+ (F) + " intentos");
            }
            else{
                req.flash("msg_incorrecto", "Alto ahi!! te quedan: "+ (F) + " intentos");
            }
            var resp = await User.findOneAndUpdate(req.params.id, {intentos: intentos});
            res.redirect("/loginPregunta?id="+req.params.id);
        }  
    }else{
        req.flash("msg_incorrecto", "Lo sentimos se te a bloqueado el acceso!");
        res.redirect("/");
    }
};

const registroGet = (req = request, res = response) => {
    res.render("registro");
};

const registroMed = async(req = request, res = response) => {
    var objReg = req.body;
    //console.log(objReg);
    var errors = [];
    try {
        const emailUser = await User.findOne({ correo: objReg.correo });
        //console.log("Encontrado: "+ emailUser);// todo el obj
        if (emailUser) {
            errors.push({ text: "El correo ya esta registrado" });

        }
        if (objReg.passconf[0] != objReg.passconf[1]) {
            errors.push({ text: "las contraseñas no son iguales" });
        }
        objReg.passconf = objReg.passconf[0];
        if (errors.length > 0) {
            res.render("registro", {
                errors,
                objReg
            });
        } else {
            objReg.clima = " ";
            objReg.cole = " ";
            objReg.color = " ";
            objReg.pais = " ";
            objReg.peli_serie = " ";
            objReg.intentos = 0;
            const newReg = new User(objReg);
            newReg.passconf = await newReg.encryptPass(objReg.passconf);
            await newReg.save();
            res.render("preguntas", {
                id: newReg._id
            });
        }
    } catch (e) {
        console.log(e);
    }
};

const registroPost = async(req = request, res = response) => {
    //console.log(req.params.id);
    objRegistro = req.body;
    var resp = await User.findOneAndUpdate(req.params.id, objRegistro ); //Encuentro el id y edito
    req.flash("msg_correcto", "Registrado!! :)");
    res.redirect("/login");
};

const pregAuntenticacion = (req = request, res = response) => {
    res.render("preguntas");
};

module.exports = {
    loginGet,
    loginMed,
    loginPregunta,
    loginPost,
    registroGet,
    registroMed,
    registroPost,
    pregAuntenticacion,
};