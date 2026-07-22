require("dotenv").config();
const morgan = require("morgan");
const path = require("path");
const express = require("express");
const cors = require("cors");
// require("./config/db");

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  process.env.CLIENT_URL,
  process.env.CLIENT_URL1,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      // Allow any localhost, 127.0.0.1, or local network IP on any port
      const isLocalhost = /^http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+|172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+)(:\d+)?$/.test(origin);

      if (isLocalhost || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("CORS Error: Origin", origin, "is not allowed");
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

// Reusable Production-Level Security Middleware (Blocker, Limiter, Logger)
const { securityMiddleware } = require("./security/middleware");
app.use(securityMiddleware);

app.use(morgan("dev")); // Shows :method :url :status :response-time ms
app.use(express.static(path.join(__dirname, "public")));

// Serve uploaded files with explicit CORS headers so the browser canvas can
// load them with crossOrigin="anonymous" (required for PDF/canvas export).
app.use("/uploads", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
}, express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json("hello from backend");
});
app.use("/api/upload-media", require("./routes/uploadMedia.route"));

app.use("/api/banners", require("./routes/banner.route"));
app.use("/api/blogs", require("./routes/blog.routes"));
app.use("/api/our-clients", require("./routes/ourClients.routes"));
app.use("/api/portfolio", require("./routes/portfolio.routes"));
app.use("/api/contacts", require("./routes/contact.routes"));
app.use("/api/invoices", require("./routes/invoice.route"));
app.use("/api/invoice-settings", require("./routes/invoiceSetting.route"));
app.use("/api/testimonials", require("./routes/testimonial.route"));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/roles", require("./routes/role.routes"));
app.use("/api/permissions", require("./routes/permission.routes"));
app.use("/api/teams", require("./routes/team.route"));
app.use("/api/certificates", require("./routes/certificate.routes"));
app.use("/api/id-cards", require("./routes/idCard.routes"));
app.use("/api/security", require("./routes/security.routes"));

let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;
