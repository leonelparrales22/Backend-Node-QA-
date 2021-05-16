const { Router } = require("express");
const { loginGet, loginMedGet, loginPost, registroGet, registroMedGet, registroPost, pregAuntenticacion } = require("../controllers/user");

const router = Router();

router.get("/login", loginGet);

router.post("/loginStep", loginMedGet);

router.post("/login", loginPost);

router.get("/reg", registroGet);

router.post("/regStep", registroMedGet);

router.post("/reg/:id", registroPost);

router.get("/preguntas", pregAuntenticacion)

module.exports = router;