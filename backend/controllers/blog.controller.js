const db = require("../models");
const Blog = db.Blog;
const { Op } = require("sequelize");
const { generateBlog } = require("../helpers/aiBlogGenerator");

function formatCanonicalLocation(loc) {
  if (!loc || typeof loc !== "string") return "";
  return loc
    .trim()
    .split(",")
    .map((seg) =>
      seg
        .trim()
        .split(/\s+/)
        .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : ""))
        .filter(Boolean)
        .join(" ")
    )
    .filter(Boolean)
    .join(", ");
}

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

    const canonicalLocation = location ? formatCanonicalLocation(location) : "";

    const generated = await generateBlog({
      title: title.trim(),
      isLocationBlog: Boolean(isLocationBlog),
      location: canonicalLocation,
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
    const body = { ...req.body };
    if (body.location) {
      body.location = formatCanonicalLocation(body.location);
    }
    const blog = await Blog.create(body);
    res.status(201).json(blog);
  } catch (err) {
    // If table doesn't have new columns yet, gracefully fallback without them
    if (err.name === "SequelizeDatabaseError" && err.parent && err.parent.code === "ER_BAD_FIELD_ERROR") {
      try {
        const fallbackBody = { ...req.body };
        delete fallbackBody.is_location_blog;
        delete fallbackBody.location;
        delete fallbackBody.keywords;
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
    const { status, search, is_location_blog, location } = req.query;
    const where = {};

    if (status) where.status = status;
    if (search) {
      where.title = {
        [Op.like]: `%${search}%`,
      };
    }

    // Filter by location blog flag if requested
    if (is_location_blog !== undefined) {
      if (is_location_blog === "true" || is_location_blog === true) {
        where.is_location_blog = true;
      } else if (is_location_blog === "false" || is_location_blog === false) {
        where[Op.or] = [
          { is_location_blog: false },
          { is_location_blog: null },
        ];
      }
    }

    // Filter by location (case-insensitive e.g. "patna" matches "Patna")
    if (location && location.trim()) {
      const cleanLoc = location.trim().toLowerCase();
      where[Op.and] = [
        ...(where[Op.and] || []),
        db.Sequelize.where(
          db.Sequelize.fn("LOWER", db.Sequelize.col("location")),
          cleanLoc
        ),
      ];
    }

    const blogs = await Blog.findAll({ where, order: [["createdAt", "DESC"]] });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET LOCATIONS LIST (Unique locations grouped case-insensitively)
exports.getBlogLocations = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        status: "published",
        is_location_blog: true,
      },
      attributes: ["id", "location"],
    });

    const locationMap = new Map();

    blogs.forEach((b) => {
      const rawLoc = b.location;
      if (!rawLoc || !rawLoc.trim()) return;

      const key = rawLoc.trim().toLowerCase();
      if (!locationMap.has(key)) {
        const canonical = formatCanonicalLocation(rawLoc);
        locationMap.set(key, {
          key,
          name: canonical || rawLoc.trim(),
          count: 0,
        });
      }
      locationMap.get(key).count += 1;
    });

    const result = Array.from(locationMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    res.json(result);
  } catch (err) {
    console.error("Error fetching blog locations:", err);
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

    const body = { ...req.body };
    if (body.location) {
      body.location = formatCanonicalLocation(body.location);
    }

    await blog.update(body);
    res.json(blog);
  } catch (err) {
    if (err.name === "SequelizeDatabaseError" && err.parent && err.parent.code === "ER_BAD_FIELD_ERROR") {
      try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        const fallbackBody = { ...req.body };
        delete fallbackBody.is_location_blog;
        delete fallbackBody.location;
        delete fallbackBody.keywords;
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

// SYNC SITEMAP
exports.syncSitemap = async (req, res) => {
  try {
    const fs = require("fs");
    const path = require("path");

    const baseUrl = (process.env.CLIENT_URL || "https://startupwebsupport.com")
      .replace(/\/$/, "")
      .replace(/localhost(:\d+)?/i, "startupwebsupport.com");

    const nowIso = new Date().toISOString();

    // 1. Fetch all published blogs
    const publishedBlogs = await Blog.findAll({
      where: { status: "published" },
      attributes: [
        "id",
        "title",
        "slug",
        "is_location_blog",
        "location",
        "updatedAt",
        "published_at",
        "createdAt",
      ],
      order: [["createdAt", "DESC"]],
    });

    // 2. Comprehensive static site pages
    const staticPages = [
      { path: "", priority: "1.00", changefreq: "daily" },
      { path: "/blog", priority: "0.90", changefreq: "daily" },
      { path: "/blog/locations", priority: "0.85", changefreq: "daily" },
      { path: "/about-us", priority: "0.80", changefreq: "monthly" },
      { path: "/contact-us", priority: "0.80", changefreq: "monthly" },
      { path: "/portfolio", priority: "0.80", changefreq: "weekly" },
      { path: "/marketing", priority: "0.80", changefreq: "weekly" },
      { path: "/tax-return-filling", priority: "0.80", changefreq: "monthly" },
      { path: "/it-internship", priority: "0.75", changefreq: "monthly" },
      { path: "/charity", priority: "0.70", changefreq: "monthly" },
      { path: "/privacy-policy", priority: "0.50", changefreq: "yearly" },
      { path: "/child-safety", priority: "0.50", changefreq: "yearly" },
      // IT Services
      { path: "/web-development-company-in-patna", priority: "0.85", changefreq: "weekly" },
      { path: "/software-development", priority: "0.85", changefreq: "weekly" },
      { path: "/mobile-app-development-services-in-patna", priority: "0.85", changefreq: "weekly" },
      { path: "/ecommerce-website-development", priority: "0.85", changefreq: "weekly" },
      { path: "/domain-and-hosting", priority: "0.80", changefreq: "monthly" },
      { path: "/sms-push-notification", priority: "0.80", changefreq: "monthly" },
      // Digital Marketing
      { path: "/digital-marketing-agency-in-patna", priority: "0.85", changefreq: "weekly" },
      { path: "/seo-company-in-patna", priority: "0.85", changefreq: "weekly" },
      { path: "/content-marketing-in-patna", priority: "0.80", changefreq: "monthly" },
      { path: "/smo-smm-services-in-patna", priority: "0.80", changefreq: "monthly" },
      { path: "/email-marketing-in-patna", priority: "0.80", changefreq: "monthly" },
      { path: "/sem-ppc-service-in-patna", priority: "0.80", changefreq: "monthly" },
      { path: "/whatsapp-marketing-services-in-patna", priority: "0.80", changefreq: "monthly" },
      { path: "/video-marketing-in-patna", priority: "0.80", changefreq: "monthly" },
      { path: "/branding-promotion-in-patna", priority: "0.80", changefreq: "monthly" },
      // Products
      { path: "/cab-booking-app", priority: "0.80", changefreq: "monthly" },
      { path: "/hospital-management-system", priority: "0.80", changefreq: "monthly" },
      { path: "/pathology", priority: "0.80", changefreq: "monthly" },
      { path: "/pathology-management-system", priority: "0.80", changefreq: "monthly" },
      { path: "/ecommerce-website", priority: "0.80", changefreq: "monthly" },
    ];

    let xmlUrls = "";
    staticPages.forEach((p) => {
      xmlUrls += `  <url>\n    <loc>${baseUrl}${p.path}</loc>\n    <lastmod>${nowIso}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>\n`;
    });

    // 3. Unique location category pages
    const uniqueLocations = new Set();
    publishedBlogs.forEach((b) => {
      if (b.is_location_blog && b.location) {
        const key = b.location.trim().toLowerCase();
        if (key && !uniqueLocations.has(key)) {
          uniqueLocations.add(key);
          xmlUrls += `  <url>\n    <loc>${baseUrl}/blog/locations?location=${encodeURIComponent(key)}</loc>\n    <lastmod>${nowIso}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.75</priority>\n  </url>\n`;
        }
      }
    });

    // 4. Dynamic published blog post URLs
    publishedBlogs.forEach((b) => {
      const slug = b.slug ? b.slug.trim() : "";
      if (!slug) return;
      const lastModDate = b.updatedAt || b.published_at || b.createdAt || new Date();
      const lastModIso = new Date(lastModDate).toISOString();
      xmlUrls += `  <url>\n    <loc>${baseUrl}/${slug}</loc>\n    <lastmod>${lastModIso}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.80</priority>\n  </url>\n`;
    });

    const fullXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlUrls}</urlset>\n`;

    // 5. Write to frontend public/sitemap.xml
    const possiblePaths = [
      path.resolve(__dirname, "../../startup-web-support-main/public/sitemap.xml"),
      path.resolve(process.cwd(), "../startup-web-support-main/public/sitemap.xml"),
      path.resolve(process.cwd(), "public/sitemap.xml"),
    ];

    let writtenPath = null;
    for (const p of possiblePaths) {
      try {
        if (fs.existsSync(path.dirname(p))) {
          fs.writeFileSync(p, fullXml, "utf8");
          writtenPath = p;
          break;
        }
      } catch (writeErr) {
        console.warn("Could not write sitemap to path:", p, writeErr.message);
      }
    }

    const totalUrls = staticPages.length + uniqueLocations.size + publishedBlogs.length;

    res.json({
      success: true,
      message: `Sitemap successfully synced! ${totalUrls} total URLs (${publishedBlogs.length} blog posts, ${uniqueLocations.size} location categories).`,
      stats: {
        totalUrls,
        staticPagesCount: staticPages.length,
        blogUrlsCount: publishedBlogs.length,
        locationPagesCount: uniqueLocations.size,
        lastSynced: nowIso,
        writtenTo: writtenPath ? "public/sitemap.xml" : null,
      },
      xml: fullXml,
    });
  } catch (err) {
    console.error("Error syncing sitemap:", err);
    res.status(500).json({ message: "Failed to sync sitemap: " + err.message });
  }
};
