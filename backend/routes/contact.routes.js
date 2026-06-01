const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

router.post("/", contactController.createContact);
router.get("/", contactController.getAllContacts);
router.post("/bulk-delete", contactController.bulkDeleteContacts);
router.get("/:id", contactController.getContactById);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
