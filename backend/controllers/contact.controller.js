const db = require("../models");
const Contact = db.Contact;

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
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
    } = req.query;

    const offset = (page - 1) * limit;

    // Build search conditions (case-insensitive)
    const { Op } = require("sequelize");
    const searchCondition = q
      ? {
          [Op.or]: [
            { firstName: { [Op.like]: `%${q}%` } },
            { lastName: { [Op.like]: `%${q}%` } },
            { email: { [Op.like]: `%${q}%` } },
            { phone: { [Op.like]: `%${q}%` } },
            { businessName: { [Op.like]: `%${q}%` } },
            { subject: { [Op.like]: `%${q}%` } },
            { pageUsed: { [Op.like]: `%${q}%` } },
          ],
        }
      : {};

    // Fetch paginated + searched contacts
    const { count, rows } = await Contact.findAndCountAll({
      where: searchCondition,
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
