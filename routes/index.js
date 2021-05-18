const express = require("express");
const Router = express.Router();
const {isAutentificado} = require("../config/auth");

Router.get("/", (req, res) => {
    res.redirect("/login");
});

Router.get("/user", isAutentificado,(req, res) => {
    var tempObj = req.user;
    console.log(tempObj);
    res.render("menu_us", {
        id: tempObj._id,
        name: tempObj.name,
        cedula: tempObj.cedula,
        mobile: tempObj.mobile,
        direccion: tempObj.direccion,
        correo:tempObj.correo,
        date: tempObj.date,
        cod: tempObj.cod,
        user: tempObj.user,
        sexo: tempObj.sexo,
        tSangre: tempObj.tSangre,
        eCivil: tempObj.eCivil,
        etnia: tempObj.etnia,
        passconf: tempObj.passconf,
        clima: tempObj.clima,
        cole: tempObj.cole,
        color: tempObj.color,
        pais: tempObj.pais,
        peli_serie: tempObj.peli_serie,
    });
});

Router.get("/user/salir", (req, res)=>{
    req.logout();
    res.redirect("/")
});

module.exports = Router;