const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");

// CRUD
router.post("/", blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:slug", blogController.getBlogBySlug);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);
router.post("/:id/featured", blogController.featuredBlogs);

module.exports = router;
