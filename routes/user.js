const express = require("express");
const router = express.Router();
const { loginGet, loginMed, loginPregunta , loginPost, registroGet, registroMed, registroPost } = require("../controllers/user");
const passport = require("passport");
const {isAutentificado, blockLogin} = require("../config/auth");

router.get("/login", blockLogin, loginGet);

//router.post("/loginStep", loginMed);
router.post("/loginStep", passport.authenticate("local.login",{
    successRedirect: "/loginPregunta",
    failureRedirect: "/login",
    failureFlash: true
}));

router.get("/loginPregunta", isAutentificado , loginPregunta )

router.post("/login/:id", loginPost);

router.get("/reg",blockLogin, registroGet);

router.post("/regStep",blockLogin, registroMed);

router.post("/reg/:id",blockLogin, registroPost);

module.exports = router;