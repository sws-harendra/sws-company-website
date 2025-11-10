exports.hasPermission = (permissionName) => {
  return (req, res, next) => {
    const userPermissions = req.user.Role.Permissions.map((p) => p.name);
    if (!userPermissions.includes(permissionName)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
