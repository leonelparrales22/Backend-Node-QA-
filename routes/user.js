const { Router } = require("express");
const { loginGet, loginMedGet ,loginPost, registroGet, registroMedGet, registroPost } = require("../controllers/user");

const router = Router();

router.get("/login", loginGet);

router.get("/loginStep", loginMedGet);

router.post("/login", loginPost);

router.get("/reg", registroGet);

router.get("/regStep", registroMedGet);

router.post("/reg", registroPost);

module.exports = router;
