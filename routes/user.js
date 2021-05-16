const express = require("express");
const router = express.Router();
const { loginGet, loginMed, loginPost, registroGet, registroMed, registroPost, pregAuntenticacion } = require("../controllers/user");

router.get("/login", loginGet);

router.post("/loginStep", loginMed);

router.post("/login", loginPost);

router.get("/reg", registroGet);

router.post("/regStep", registroMed);

router.post("/reg/:id", registroPost);

router.get("/preguntas", pregAuntenticacion)

module.exports = router;