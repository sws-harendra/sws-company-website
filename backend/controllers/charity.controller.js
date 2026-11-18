const db = require("../models");
const Charity = db.Charity;
const { Op } = require("sequelize");

const parseImages = (images) => {
  if (!images) return [];
  if (Array.isArray(images)) return images;
  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return images.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
};

// Create a new charity initiative
const createCharity = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      category,
      description,
      image_url,
      images,
      location,
      date,
      impact_number,
      target_amount,
      raised_amount,
      status,
      featured,
      order,
      redirect_url,
    } = req.body;

    if (!title || !description || !image_url) {
      return res.status(400).json({
        error: "Title, description, and primary cover image are required.",
      });
    }

    const charity = await Charity.create({
      title,
      subtitle: subtitle || null,
      category: category || "Community Support",
      description,
      image_url,
      images: parseImages(images),
      location: location || null,
      date: date || null,
      impact_number: impact_number || null,
      target_amount: target_amount ? parseFloat(target_amount) : 0,
      raised_amount: raised_amount ? parseFloat(raised_amount) : 0,
      status: status || "active",
      featured: featured === true || featured === "true",
      order: order ? parseInt(order, 10) : 0,
      redirect_url: redirect_url || null,
    });

    res.status(201).json(charity);
  } catch (error) {
    console.error("Create Charity Error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all charity initiatives with pagination, filters, and search
const getAllCharities = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { search, category, status, featured } = req.query;

    const where = {};

    if (search && search.trim() !== "") {
      where[Op.or] = [
        { title: { [Op.like]: `%${search.trim()}%` } },
        { subtitle: { [Op.like]: `%${search.trim()}%` } },
        { description: { [Op.like]: `%${search.trim()}%` } },
        { category: { [Op.like]: `%${search.trim()}%` } },
        { location: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    if (category && category !== "all") {
      where.category = category;
    }

    if (status && status !== "all") {
      where.status = status;
    }

    if (featured !== undefined && featured !== "all") {
      where.featured = featured === "true" || featured === true;
    }

    const { count, rows: charities } = await Charity.findAndCountAll({
      where,
      order: [
        ["featured", "DESC"],
        ["order", "ASC"],
        ["createdAt", "DESC"],
      ],
      limit,
      offset,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      pageSize: limit,
      charities,
    });
  } catch (error) {
    console.error("Get All Charities Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single charity initiative by ID
const getCharityById = async (req, res) => {
  try {
    const charity = await Charity.findByPk(req.params.id);
    if (!charity) {
      return res.status(404).json({ error: "Charity initiative not found" });
    }
    res.json(charity);
  } catch (error) {
    console.error("Get Charity By ID Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a charity initiative
const updateCharity = async (req, res) => {
  try {
    const charity = await Charity.findByPk(req.params.id);
    if (!charity) {
      return res.status(404).json({ error: "Charity initiative not found" });
    }

    const {
      title,
      subtitle,
      category,
      description,
      image_url,
      images,
      location,
      date,
      impact_number,
      target_amount,
      raised_amount,
      status,
      featured,
      order,
      redirect_url,
    } = req.body;

    await charity.update({
      title: title !== undefined ? title : charity.title,
      subtitle: subtitle !== undefined ? subtitle : charity.subtitle,
      category: category !== undefined ? category : charity.category,
      description: description !== undefined ? description : charity.description,
      image_url: image_url !== undefined ? image_url : charity.image_url,
      images: images !== undefined ? parseImages(images) : charity.images,
      location: location !== undefined ? location : charity.location,
      date: date !== undefined ? date : charity.date,
      impact_number: impact_number !== undefined ? impact_number : charity.impact_number,
      target_amount: target_amount !== undefined ? parseFloat(target_amount) : charity.target_amount,
      raised_amount: raised_amount !== undefined ? parseFloat(raised_amount) : charity.raised_amount,
      status: status !== undefined ? status : charity.status,
      featured: featured !== undefined ? (featured === true || featured === "true") : charity.featured,
      order: order !== undefined ? parseInt(order, 10) : charity.order,
      redirect_url: redirect_url !== undefined ? redirect_url : charity.redirect_url,
    });

    res.json(charity);
  } catch (error) {
    console.error("Update Charity Error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a charity initiative
const deleteCharity = async (req, res) => {
  try {
    const charity = await Charity.findByPk(req.params.id);
    if (!charity) {
      return res.status(404).json({ error: "Charity initiative not found" });
    }

    await charity.destroy();
    res.json({ message: "Charity initiative deleted successfully" });
  } catch (error) {
    console.error("Delete Charity Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCharity,
  getAllCharities,
  getCharityById,
  updateCharity,
  deleteCharity,
};
