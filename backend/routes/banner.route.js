const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/banner.controller");

// CRUD Routes
router.post("/", bannerController.createBanner);
router.get("/", bannerController.getAllBanners);
router.get("/:id", bannerController.getBannerById);
router.put("/:id", bannerController.updateBanner);
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;
