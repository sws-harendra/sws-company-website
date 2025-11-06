const db = require("../models");
const Blog = db.Blog;
const { Op } = require("sequelize");

// CREATE
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
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
    const blog = await Blog.findOne({ where: { slug: req.params.slug } });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
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
