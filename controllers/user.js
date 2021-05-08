const { response, request } = require("express");
const reg = require("../models/esquema");

const loginGet = (req = request, res = response) => {
  res.render("login");
};

const loginPost = (req = request, res = response) => {
  console.log(req.body);
  res.send("ok");
};

const registroGet = (req = request, res = response) => {
  //const { id } = req.params;
  res.render("registro");
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
  loginPost,
  registroGet,
  registroPost,
};
