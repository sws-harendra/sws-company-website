const express = require("express");
const router = express.Router();
const idCardController = require("../controllers/idCard.controller");
const { authenticated } = require("../middlewares/auth.middleware");

// Settings & Config
router.get("/settings", authenticated, idCardController.getSettings);
router.post("/settings/template", authenticated, idCardController.uploadTemplate);
router.put("/settings/config", authenticated, idCardController.updateConfig);

// Helper for photo upload
router.post("/upload-photo", authenticated, idCardController.uploadPhoto);

// Get next serial number
router.get("/next-serial", authenticated, idCardController.getNextSerial);

// CRUD
router.post("/", authenticated, idCardController.createIdCard);
router.get("/", authenticated, idCardController.getAllIdCards);
router.delete("/:id", authenticated, idCardController.deleteIdCard);

module.exports = router;
