const { Certificate, CertificateSetting } = require("../models");
const { Op, literal } = require("sequelize");
const { upload } = require("../helpers/multer");

// Always derive a valid base URL — never let it be "undefined"
const BACKEND_URL = (process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 8000}`).replace(/\/$/, "");

exports.getSettings = async (req, res) => {
  try {
    const type = req.query.type || 'Internship Certificate';
    let setting = await CertificateSetting.findOne({ where: { type } });
    if (!setting) {
      setting = await CertificateSetting.create({ templateUrl: null, templateFileType: null, type });
    }

    const url = setting.templateUrl;
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      console.warn("Clearing corrupt template URL from DB:", url);
      await setting.update({ templateUrl: null, templateFileType: null });
      setting = { ...setting.toJSON(), templateUrl: null, templateFileType: null };
    }

    res.status(200).json({ success: true, setting });
  } catch (error) {
    console.error("Error getting certificate settings:", error);
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
      const type = req.body.type || 'Internship Certificate';

      let setting = await CertificateSetting.findOne({ where: { type } });
      if (!setting) {
        setting = await CertificateSetting.create({ templateUrl, templateFileType, type });
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
    const { config, type = 'Internship Certificate' } = req.body;
    if (!config) return res.status(400).json({ success: false, message: "Config is required" });

    let setting = await CertificateSetting.findOne({ where: { type } });
    if (!setting) {
      setting = await CertificateSetting.create({ config, type });
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
    const currentYear = new Date().getFullYear();
    const prefix = `SWS${currentYear}-`;

    const lastCertificate = await Certificate.findOne({
      where: {
        serialNo: {
          [Op.like]: `${prefix}%`
        }
      },
      order: [["createdAt", "DESC"]],
    });

    let nextNumber = 1;
    if (lastCertificate && lastCertificate.serialNo) {
      const parts = lastCertificate.serialNo.split("-");
      if (parts.length === 2) {
        const parsed = parseInt(parts[1], 10);
        if (!isNaN(parsed)) nextNumber = parsed + 1;
      }
    }

    const formattedNumber = nextNumber.toString().padStart(2, "0");
    const nextSerialNo = `${prefix}${formattedNumber}`;

    require('fs').writeFileSync('debug-serial.json', JSON.stringify({ success: true, nextSerialNo }));
    res.status(200).json({ success: true, nextSerialNo });
  } catch (error) {
    require('fs').writeFileSync('debug-serial.json', JSON.stringify({ success: false, error: error.message, stack: error.stack }));
    console.error("Error getting next serial no:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

exports.createCertificate = async (req, res) => {
  try {
    const { name, role, startDate, endDate, serialNo, issueDate, templateUrl, templateFileType, config, type = 'Internship Certificate' } = req.body;

    if (!name || !role || !serialNo || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        received: { name: !!name, role: !!role, serialNo: !!serialNo, startDate: !!startDate, endDate: !!endDate },
      });
    }

    // Check for duplicate serial number first to give a friendly error
    const exists = await Certificate.findOne({ where: { serialNo } });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: `Serial number ${serialNo} already exists. Please refresh and try again.`,
      });
    }

    const certificate = await Certificate.create({
      name: name.toUpperCase(),
      role: role.toUpperCase(),
      startDate,
      endDate,
      serialNo,
      issueDate,
      templateUrl,
      templateFileType,
      config,
      type,
    });

    res.status(201).json({ success: true, certificate, message: "Certificate saved successfully" });
  } catch (error) {
    console.error("Error creating certificate:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      detail: error.original?.sqlMessage || null,
    });
  }
};

exports.getAllCertificates = async (req, res) => {
  try {
    const { type } = req.query;
    const where = type ? { type } : {};
    const certificates = await Certificate.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ success: true, certificates });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
exports.deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findByPk(id);

    if (!certificate) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }

    await certificate.destroy();
    res.status(200).json({ success: true, message: "Certificate deleted successfully" });
  } catch (error) {
    console.error("Error deleting certificate:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
