const express = require("express");
const router = express.Router();
const { upload } = require("../helpers/multer");

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Public URL (if serving /uploads statically)
  const fileUrl = req.file.filename;
  const fullUrl = `${process.env.BACKEND_URL}/uploads/${fileUrl}`; // ✅ concatenation

  res.json({ url: fullUrl });
});

module.exports = router;
