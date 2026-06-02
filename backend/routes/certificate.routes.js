const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificate.controller");
const { authenticated } = require("../middlewares/auth.middleware");

// Settings (template persistence)
router.get("/settings", authenticated, certificateController.getSettings);
router.post("/settings/template", authenticated, certificateController.uploadTemplate);
router.put("/settings/config", authenticated, certificateController.updateConfig);

// Serial number
router.get("/next-serial", authenticated, certificateController.getNextSerial);

// Certificates CRUD
router.get("/", authenticated, certificateController.getAllCertificates);
router.post("/", authenticated, certificateController.createCertificate);
router.delete("/:id", authenticated, certificateController.deleteCertificate);

module.exports = router;
