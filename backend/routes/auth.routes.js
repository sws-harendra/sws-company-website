const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const { authenticated } = require("../middlewares/auth.middleware");

router.post("/register", controller.register);
router.post("/login", controller.login);

router.post("/userdetail", authenticated, controller.getUserDetail);

module.exports = router;
