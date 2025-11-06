const db = require("../models");
const Banner = db.Banner;

// Create new banner
exports.createBanner = async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll();
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single banner by ID
exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update banner
exports.updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    await banner.update(req.body);
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete banner
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    await banner.destroy();
    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
