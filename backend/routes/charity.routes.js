const express = require("express");
const router = express.Router();
const {
  createCharity,
  getAllCharities,
  getCharityById,
  updateCharity,
  deleteCharity,
} = require("../controllers/charity.controller");

// Create a new charity initiative
router.post("/", createCharity);

// Get all charity initiatives
router.get("/", getAllCharities);

// Get a single charity initiative by ID
router.get("/:id", getCharityById);

// Update a charity initiative by ID
router.put("/:id", updateCharity);

// Delete a charity initiative by ID
router.delete("/:id", deleteCharity);

module.exports = router;
