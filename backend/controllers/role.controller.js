const { Role, Permission } = require("../models");

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Role.create({ name });
    res.json(role);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Assign permissions to a role
exports.assignPermissions = async (req, res) => {
  try {
    const { roleId, permissionIds } = req.body;
    const role = await Role.findByPk(roleId);
    if (!role) return res.status(404).json({ message: "Role not found" });

    await role.setPermissions(permissionIds);
    res.json({ message: "Permissions assigned successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all roles with their permissions
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      // include: {
      //   model: Permission,
      //   as: "Permissions",
      //   attributes: ["id", "name"], // only include id and name
      //   through: { attributes: [] }, // hide join table
      // },
    });
    res.json(roles);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Edit role name
exports.editRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { name } = req.body;

    const role = await Role.findByPk(roleId);
    if (!role) return res.status(404).json({ message: "Role not found" });

    role.name = name || role.name;
    await role.save();

    res.json({ message: "Role updated successfully", role });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
