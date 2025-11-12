const db = require("../models");
const Team = db.Team;

module.exports = {
  // Create a new team member
  async create(req, res) {
    try {
      const { image, name, position, description } = req.body;

      if (!name || !position)
        return res
          .status(400)
          .json({ success: false, message: "Name and position are required" });

      const newMember = await Team.create({
        image,
        name,
        position,
        description,
      });
      res.json({ success: true, data: newMember });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // Get all team members
  async findAll(req, res) {
    try {
      const teams = await Team.findAll({ order: [["id", "DESC"]] });
      res.json({ success: true, data: teams });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // Get single team member
  async findOne(req, res) {
    try {
      const { id } = req.params;
      const team = await Team.findByPk(id);
      if (!team)
        return res
          .status(404)
          .json({ success: false, message: "Team member not found" });
      res.json({ success: true, data: team });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // Update a team member
  async update(req, res) {
    try {
      const { id } = req.params;
      const { image, name, position, description } = req.body;

      const team = await Team.findByPk(id);
      if (!team)
        return res
          .status(404)
          .json({ success: false, message: "Team member not found" });

      await team.update({ image, name, position, description });
      res.json({ success: true, data: team });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // Delete a team member
  async delete(req, res) {
    try {
      const { id } = req.params;
      const team = await Team.findByPk(id);
      if (!team)
        return res
          .status(404)
          .json({ success: false, message: "Team member not found" });

      await team.destroy();
      res.json({ success: true, message: "Team member deleted" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};
