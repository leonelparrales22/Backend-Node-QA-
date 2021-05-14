const { response, request } = require("express");
const User = require("../models/esquema");

const loginGet = (req = request, res = response) => {
  res.render("login");
};

const loginMedGet = async(req = request, res = response) => {
  var rand = Math.floor(Math.random() * (10 - 0)); //0 a 9
  var objLogin = req.query;
  console.log(objLogin);
  try {
    const correo = await User.findOne({correo: objLogin.correo});
    if(correo){
      var equal = await correo.decryptPass(objLogin.pass, correo.passconf);
      console.log(correo);
      if(equal){
        console.log(req.User);
        res.send("Ok validaciones completadas "+ rand);
      }else{
        req.flash("msg_incorrecto", "Contraseña incorrecta :)");
        res.redirect("/api/usuarios/login");
      }
    }else{
      req.flash("msg_incorrecto", "Correo no Existe!! :)");
      res.redirect("/api/usuarios/login");
    }
  } catch (error) {
    console.log(error);
  }
};

const loginPost = async (req = request, res = response) => {
  console.log(req.body);
  //const mail = await reg.find({correo: req.body.correo})
  
  res.send("ok");
};

const registroGet = (req = request, res = response) => {
  res.render("registro");
};

const registroMedGet = async(req = request, res = response) => {
  var objReg = req.query;
  objReg.passconf = objReg.passconf[0];
  //console.log(objReg);
  var errors = [];
  try {
    const emailUser = await User.findOne({correo: objReg.correo});
    //console.log("Encontrado: "+ emailUser); todo el obj
    if(emailUser){
      errors.push({text: "El correo ya esta registrado"});
      
    }
    if(objReg.passconf[0] != objReg.passconf[1]){
      errors.push({text: "las contraseñas no son iguales"});
    }
    if(errors.length > 0){
      res.render("registro", {
        errors,
        objReg
      });
    }else{
      const newReg = new User(objReg);
      newReg.passconf = await newReg.encryptPass(objReg.passconf);
      await newReg.save();
      req.flash("msg_correcto", "Registrado!! :)");
      res.redirect("/api/usuarios/login");
    }
  } catch (e) {
    console.log(e);
  }
};

const registroPost = async (req = request, res = response) => {
  console.log(req.params.id);
  objRegistroP2 = req.body;
  console.log(req.body);
  await User.findByIdAndUpdate(req.params.id, {objRegistroP2});//Encuentro el id y edito
  /*const newReg = new reg(req.body);
  await newReg.save();
  console.log(newReg);*/
  res.redirect("/user");
};

module.exports = {
  loginGet,
  loginMedGet,
  loginPost,
  registroGet,
  registroMedGet,
  registroPost,
};
