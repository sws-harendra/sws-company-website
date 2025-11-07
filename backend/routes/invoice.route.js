const express = require("express");
const router = express.Router();
const controller = require("../controllers/invoice.controller");

router.post("/", controller.createInvoice);
router.put("/:id", controller.updateInvoice);
router.get("/", controller.getAllInvoices);
router.get("/:id", controller.getInvoiceById);
router.get("/invoice-pdf/:id", controller.downloadInvoicePDF);

module.exports = router;
