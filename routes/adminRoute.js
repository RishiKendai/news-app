const router = require("express").Router();

const { register, login } = require("../controllers/adminController");
const loginMiddleware = require("../middleware/login.js");
const registerMiddleware = require("../middleware/register.js");

router.post("/register", registerMiddleware, register);
router.post("/login", loginMiddleware, login);

module.exports = router;
