require("dotenv").config();
const morgan = require("morgan");
const path = require("path");
const express = require("express");
const cors = require("cors");
// require("./config/db");

const app = express();
const allowedOrigins = ["http://localhost:3000", process.env.CLIENT_URL];

app.use(
  cors({
    origin: allowedOrigins, // or your frontend URL
    credentials: true, // allow sending cookies/headers
  })
);
app.use(express.json());

app.use(morgan("dev")); // Shows :method :url :status :response-time ms

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;
