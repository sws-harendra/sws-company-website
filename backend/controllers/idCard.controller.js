const { IdCard, IdCardSetting } = require("../models");
const { Op, literal } = require("sequelize");
const { upload } = require("../helpers/multer");

const BACKEND_URL = (process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 8000}`).replace(/\/$/, "");

exports.getSettings = async (req, res) => {
  try {
    let setting = await IdCardSetting.findOne();
    if (!setting) {
      setting = await IdCardSetting.create({ templateUrl: null, templateFileType: null });
    }

    const url = setting.templateUrl;
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      console.warn("Clearing corrupt template URL from DB:", url);
      await setting.update({ templateUrl: null, templateFileType: null });
      setting = { ...setting.toJSON(), templateUrl: null, templateFileType: null };
    }

    res.status(200).json({ success: true, setting });
  } catch (error) {
    console.error("Error getting ID card settings:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.uploadTemplate = [
  upload.single("template"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }

      const templateUrl = `${BACKEND_URL}/uploads/${req.file.filename}`;
      const templateFileType = req.file.mimetype;

      let setting = await IdCardSetting.findOne();
      if (!setting) {
        setting = await IdCardSetting.create({ templateUrl, templateFileType });
      } else {
        await setting.update({ templateUrl, templateFileType });
      }

      res.status(200).json({ success: true, templateUrl, templateFileType });
    } catch (error) {
      console.error("Error uploading template:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },
];

exports.updateConfig = async (req, res) => {
  try {
    const { config } = req.body;
    if (!config) return res.status(400).json({ success: false, message: "Config is required" });

    let setting = await IdCardSetting.findOne();
    if (!setting) {
      setting = await IdCardSetting.create({ config });
    } else {
      await setting.update({ config });
    }

    res.status(200).json({ success: true, message: "Configuration saved successfully", config: setting.config });
  } catch (error) {
    console.error("Error updating config:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getNextSerial = async (req, res) => {
  try {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomStr = '';
    for (let i = 0; i < 6; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const nextSerialNo = `SWS-${randomStr}`;

    res.status(200).json({ success: true, nextSerialNo });
  } catch (error) {
    console.error("Error getting next serial no:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

exports.uploadPhoto = [
  upload.single("photo"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No photo uploaded" });
      }

      const photoUrl = `${BACKEND_URL}/uploads/${req.file.filename}`;
      res.status(200).json({ success: true, photoUrl });
    } catch (error) {
      console.error("Error uploading photo:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },
];

exports.createIdCard = async (req, res) => {
  try {
    const { name, role, idNumber, bloodGroup, phone, email, issueDate, photoUrl, templateUrl, templateFileType, config } = req.body;

    if (!name || !role || !idNumber || !issueDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const exists = await IdCard.findOne({ where: { idNumber } });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: `ID number ${idNumber} already exists. Please refresh and try again.`,
      });
    }

    const idCard = await IdCard.create({
      name: name.toUpperCase(),
      role: role.toUpperCase(),
      idNumber,
      bloodGroup: bloodGroup ? bloodGroup.toUpperCase() : null,
      phone,
      email,
      issueDate,
      photoUrl,
      templateUrl,
      templateFileType,
      config,
    });

    res.status(201).json({ success: true, idCard, message: "ID Card saved successfully" });
  } catch (error) {
    console.error("Error creating ID card:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

exports.getAllIdCards = async (req, res) => {
  try {
    const idCards = await IdCard.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ success: true, idCards });
  } catch (error) {
    console.error("Error fetching ID cards:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteIdCard = async (req, res) => {
  try {
    const { id } = req.params;
    const idCard = await IdCard.findByPk(id);
    
    if (!idCard) {
      return res.status(404).json({ success: false, message: "ID Card not found" });
    }

    await idCard.destroy();
    res.status(200).json({ success: true, message: "ID Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting ID card:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
