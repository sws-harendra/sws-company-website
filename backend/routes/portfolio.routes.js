const express = require("express");
const router = express.Router();
const {
  createPortfolio,
  getAllPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolio.controller");

// Create a new portfolio item
router.post("/", createPortfolio);

// Get all portfolio items
router.get("/", getAllPortfolios);

// Get a single portfolio item by ID
router.get("/:id", getPortfolioById);

// Update a portfolio item by ID
router.put("/:id", updatePortfolio);

// Delete a portfolio item by ID
router.delete("/:id", deletePortfolio);

module.exports = router;
