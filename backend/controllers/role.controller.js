const { Role, Permission } = require("../models");

exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Role.create({ name });
    res.json(role);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

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
