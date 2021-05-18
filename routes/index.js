const express = require("express");
const Router = express.Router();
const {isAutentificado} = require("../config/auth");

Router.get("/", (req, res) => {
    res.redirect("/login");
});

Router.get("/user", isAutentificado,(req, res) => {
    var tempObj = req.user;
    var tempObjSinId = req.user;
    console.log(tempObj);
    res.render("menu_us", {
        data: tempObj,
        id: tempObj._id
    });
});

Router.get("/user/salir", (req, res)=>{
    req.logout();
    res.redirect("/")
});

module.exports = Router;