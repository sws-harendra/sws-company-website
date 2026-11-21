const db = require("../models");
const Blog = db.Blog;
const { Op } = require("sequelize");
const { generateBlog } = require("../helpers/aiBlogGenerator");

// AI GENERATE BLOG
exports.generateBlogWithAI = async (req, res) => {
  try {
    const { title, isLocationBlog, location, keywords, tone, provider } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Please provide a blog title or topic." });
    }

    if (isLocationBlog && (!location || !location.trim())) {
      return res.status(400).json({ message: "Please provide a target location for the location blog." });
    }

    const generated = await generateBlog({
      title: title.trim(),
      isLocationBlog: Boolean(isLocationBlog),
      location: location ? location.trim() : "",
      keywords: keywords ? String(keywords).trim() : "",
      tone: tone ? String(tone).trim() : "",
      provider: provider || "auto",
    });

    res.json({
      success: true,
      data: generated,
    });
  } catch (err) {
    console.error("Error generating blog with AI:", err);
    res.status(500).json({
      message: err.message || "Failed to generate blog with AI. Please check API keys.",
    });
  }
};

// CREATE
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    // If table doesn't have new columns yet, gracefully fallback without them
    if (err.name === "SequelizeDatabaseError" && err.parent && err.parent.code === "ER_BAD_FIELD_ERROR") {
      try {
        const fallbackBody = { ...req.body };
        delete fallbackBody.is_location_blog;
        delete fallbackBody.location;
        const blog = await Blog.create(fallbackBody);
        return res.status(201).json(blog);
      } catch (fallbackErr) {
        return res.status(500).json({ message: fallbackErr.message });
      }
    }
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getAllBlogs = async (req, res) => {
  try {
    const { status, search } = req.query;
    const where = {};

    if (status) where.status = status;
    if (search)
      where.title = {
        [Op.like]: `%${search}%`,
      };

    const blogs = await Blog.findAll({ where, order: [["createdAt", "DESC"]] });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
exports.getBlogBySlug = async (req, res) => {
  try {
    const identifier = req.params.slug;
    const isNumeric = /^\d+$/.test(identifier);
    const where = isNumeric
      ? { [Op.or]: [{ id: identifier }, { slug: identifier }] }
      : { slug: identifier };

    const blog = await Blog.findOne({
      where,
      include: [
        {
          model: Blog,
          as: "FeaturedBlogs",
          attributes: ["id", "title", "short_description", "image_url", "slug", "redirect_url"],
          through: { attributes: [] }, // hides join table data
        },
      ],
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Blog,
          as: "FeaturedBlogs",
          attributes: ["id", "title", "short_description", "image_url", "slug", "redirect_url"],
          through: { attributes: [] },
        },
      ],
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (err) {
    console.error("Error fetching blog by ID:", err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.update(req.body);
    res.json(blog);
  } catch (err) {
    if (err.name === "SequelizeDatabaseError" && err.parent && err.parent.code === "ER_BAD_FIELD_ERROR") {
      try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        const fallbackBody = { ...req.body };
        delete fallbackBody.is_location_blog;
        delete fallbackBody.location;
        await blog.update(fallbackBody);
        return res.json(blog);
      } catch (fallbackErr) {
        return res.status(500).json({ message: fallbackErr.message });
      }
    }
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.destroy();
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.featuredBlogs = async (req, res) => {
  try {
    const { featuredBlogIds } = req.body; // array of blog IDs
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.setFeaturedBlogs(featuredBlogIds || []);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update featured blogs" });
  }
};
