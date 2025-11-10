const router = require("express").Router();
const controller = require("../controllers/permission.controller");
const { authenticated } = require("../middlewares/auth.middleware");

router.post("/", authenticated, controller.createPermission);
router.get("/", authenticated, controller.getAll);

module.exports = router;
