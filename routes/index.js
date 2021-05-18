const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
    res.redirect("/login");
});

Router.get("/user", (req, res) => {
    res.render("menu_us");
});

module.exports = Router;