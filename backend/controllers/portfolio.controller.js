const db = require("../models");
const Portfolio = db.Portfolio;

// Create a new portfolio item
const createPortfolio = async (req, res) => {
  try {
    const { title, description, image_url, redirect_url } = req.body;
    const portfolio = await Portfolio.create({
      title,
      description,
      image_url,
      redirect_url,
    });
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all portfolio items
const getAllPortfolios = async (req, res) => {
  try {
    // Get pagination params from query (defaults: page=1, limit=10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate offset
    const offset = (page - 1) * limit;

    // Fetch data with pagination
    const { count, rows: portfolios } = await Portfolio.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    // Send paginated response
    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      pageSize: limit,
      portfolios,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single portfolio item by ID
const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a portfolio item
const updatePortfolio = async (req, res) => {
  try {
    const { title, description, image_url, redirect_url } = req.body;
    const portfolio = await Portfolio.findByPk(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }

    portfolio.title = title || portfolio.title;
    portfolio.description =
      description !== undefined ? description : portfolio.description;
    portfolio.image_url = image_url || portfolio.image_url;
    portfolio.redirect_url = redirect_url || portfolio.redirect_url;

    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a portfolio item
const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }

    await portfolio.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPortfolio,
  getAllPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
};
