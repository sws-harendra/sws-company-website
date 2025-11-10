const jwt = require("jsonwebtoken");
const { User, Role, Permission } = require("../models");
const SECRET = process.env.JWT_SECRET || "supersecret";

exports.authenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findByPk(decoded.id, {
      include: { model: Role, include: Permission },
    });
    if (!user) return res.status(401).json({ message: "Invalid token" });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
