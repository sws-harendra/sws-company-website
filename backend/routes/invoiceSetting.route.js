const express = require("express");
const router = express.Router();
const invoiceSettingController = require("../controllers/invoiceSetting.controller");

router.get("/", invoiceSettingController.getSettings);
router.put("/", invoiceSettingController.updateSettings);

module.exports = router;
