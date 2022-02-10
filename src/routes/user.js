const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { login, logout, register } = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);

module.exports = router;
