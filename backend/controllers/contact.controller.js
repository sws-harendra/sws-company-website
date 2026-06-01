const sendMail = require("../helpers/mailService");
const db = require("../models");
const Contact = db.Contact;

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    sendMail(
      process.env.ADMIN_EMAIL,
      "New Contact Us Submission",
      "newContact",
      {
        name: req.body.fullname,
        email: req.body.email,
        contact: req.body.phone || "N/A",
        // subject: req.body?.subject,
        // pageUsed: req.body?.pageUsed,
        // message: req.body.message,
      }
    );
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; // controllers/contact.controller.js

exports.getAllContacts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      q = "",
      sortBy = "createdAt",
      order = "DESC",
      startDate,
      endDate,
    } = req.query;

    const offset = (page - 1) * limit;
    const { Op } = require("sequelize");

    // Search condition
    const searchCondition = q
      ? {
          [Op.or]: [
            { fullname: { [Op.like]: `%${q}%` } },
            { email: { [Op.like]: `%${q}%` } },
            { phone: { [Op.like]: `%${q}%` } },
            { subject: { [Op.like]: `%${q}%` } },
            { pageUsed: { [Op.like]: `%${q}%` } },
          ],
        }
      : {};

    // Date filter (if provided)
    const dateCondition =
      startDate && endDate
        ? {
            createdAt: {
              [Op.between]: [new Date(startDate), new Date(endDate)],
            },
          }
        : {};

    // Combine filters
    const where = { ...searchCondition, ...dateCondition };

    const { count, rows } = await Contact.findAndCountAll({
      where,
      order: [[sortBy, order.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      pageSize: parseInt(limit),
      contacts: rows,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get single contact
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bulk delete contacts
exports.bulkDeleteContacts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided" });
    }
    const { Op } = require("sequelize");
    const deletedCount = await Contact.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    res.json({ message: `${deletedCount} contacts deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
