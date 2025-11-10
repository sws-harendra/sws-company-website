const router = require("express").Router();
const controller = require("../controllers/role.controller");
const { authenticated } = require("../middlewares/auth.middleware");
const { hasPermission } = require("../middlewares/permission.middleware");

router.post(
  "/",
  authenticated,
  hasPermission("create_role"),
  controller.createRole
);
router.post(
  "/assign",
  authenticated,
  hasPermission("assign_permission"),
  controller.assignPermissions
);

module.exports = router;
