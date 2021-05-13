const { response, request } = require("express");
const reg = require("../models/esquema");

const loginGet = (req = request, res = response) => {
  res.render("login");
};

const loginMedGet = (req = request, res = response) => {
  var rand = Math.floor(Math.random() * (10 - 0)); //0 a 9
  var objLogin = req.query;
  console.log(objLogin);
  res.send("login paso 2 Random-> "+ rand);
};

const loginPost = async (req = request, res = response) => {
  console.log(req.body);
  const mail = await reg.find({correo: req.body.correo})
  res.send("ok");
};

const registroGet = (req = request, res = response) => {
  res.render("registro");
};

const registroMedGet = (req = request, res = response) => {
  var objReg = req.query;
  console.log(req.query);
  res.send("registro paso 2");
};

const registroPost = async (req = request, res = response) => {
  console.log(req.body.pass);
  var correo = req.body.correo;
  var pass = req.body.pass;
  const newReg = new reg(req.body);
  await newReg.save();
  console.log(newReg);
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
