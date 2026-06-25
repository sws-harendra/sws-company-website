const router = require("express").Router();
const controller = require("../controllers/security.controller");
const { authenticated } = require("../middlewares/auth.middleware");
const { hasPermission } = require("../middlewares/permission.middleware");

// All security routes require authentication and the 'manage_security' permission
router.use(authenticated);
router.use(hasPermission("manage_security"));

router.get("/logs", controller.getLogs);
router.get("/stats", controller.getSecurityStats);

router.get("/blocks", controller.getBlockedRules);
router.post("/blocks", controller.createBlockRule);
router.delete("/blocks/:id", controller.deleteBlockRule);

module.exports = router;
