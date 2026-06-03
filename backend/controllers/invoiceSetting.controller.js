const { InvoiceSetting } = require("../models");

exports.getSettings = async (req, res) => {
  try {
    let settings = await InvoiceSetting.findOne();
    if (!settings) {
      settings = await InvoiceSetting.create({
        gstNumber: "",
        accountNumber: "",
        ifsc: "",
        accountName: "",
      });
    }
    res.json(settings);
  } catch (error) {
    console.error("Error fetching invoice settings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    let settings = await InvoiceSetting.findOne();
    if (!settings) {
      settings = await InvoiceSetting.create(req.body);
    } else {
      await settings.update(req.body);
    }
    res.json({ message: "Settings updated successfully", settings });
  } catch (error) {
    console.error("Error updating invoice settings:", error);
    res.status(500).json({ message: "Server error" });
  }
};
