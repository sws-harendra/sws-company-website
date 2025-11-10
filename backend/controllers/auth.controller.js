const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Role, Permission } = require("../models");

const SECRET = process.env.JWT_SECRET || "supersecret";

exports.register = async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, roleId });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: { model: Role, include: Permission },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, roleId: user.roleId }, SECRET, {
      expiresIn: "7d",
    });

    // ✅ Remove password before sending user
    const safeUser = user.toJSON();
    delete safeUser.password;

    res.json({ token, user: safeUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUserDetail = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // You can shape the response as you like
    const userData = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.Role ? req.user.Role.name : null,
      permissions: req.user.Role?.Permissions?.map((p) => p.name) || [],
    };

    res.status(200).json({ success: true, user: userData });
  } catch (error) {
    console.error("Error fetching authenticated user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
