const { Op } = require("sequelize");
const db = require("../models");
const OurClient = db.OurClient;

// Create a new client
const createClient = async (req, res) => {
  try {
    const { brandName, url, logo } = req.body;
    const client = await OurClient.create({ brandName, url, logo });
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const clients = await OurClient.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single client by ID
const getClientById = async (req, res) => {
  try {
    const client = await OurClient.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a client
const updateClient = async (req, res) => {
  try {
    const { brandName, url, logo } = req.body;
    const client = await OurClient.findByPk(req.params.id);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    client.brandName = brandName || client.brandName;
    client.url = url || client.url;
    client.logo = logo || client.logo;

    await client.save();
    res.json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a client
const deleteClient = async (req, res) => {
  try {
    const client = await OurClient.findByPk(req.params.id);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    await client.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
