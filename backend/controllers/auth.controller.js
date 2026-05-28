const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { User, Role, Permission } = require("../models");
const sendMail = require("../helpers/mailService");
const { Op } = require("sequelize");

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

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    const resetUrl = `${clientUrl}/admin/reset-password?token=${resetToken}`;

    try {
      await sendMail(user.email, "Password Reset Request", "forgotPassword", {
        name: user.name,
        resetUrl,
      });
    } catch (mailError) {
      console.error("Mail service error:", mailError);
      return res.status(500).json({ message: "Failed to send reset email. SMTP may not be configured." });
    }

    res.status(200).json({ message: "Password reset link has been sent to your email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired password reset token" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Password has been successfully reset" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
