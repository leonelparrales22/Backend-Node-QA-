const { Router } = require("express");
const { loginGet, loginPost, registroGet , registroPost } = require("../controllers/user");

const router = Router();

router.get("/login", loginGet);

router.post("/login", loginPost);

router.get("/reg", registroGet);

router.post("/reg", registroPost);

module.exports = router;
