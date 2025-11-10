"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Create default permissions if none exist
    const [permissions] = await queryInterface.sequelize.query(
      `SELECT * FROM Permissions`
    );

    let permissionIds = [];

    if (permissions.length === 0) {
      const defaultPermissions = [
        "manage_users",
        "manage_roles",
        "manage_permissions",
        "manage_jobs",
        "view_dashboard",
      ];

      await queryInterface.bulkInsert(
        "Permissions",
        defaultPermissions.map((name) => ({
          name,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        {}
      );

      const [newPerms] = await queryInterface.sequelize.query(
        `SELECT id FROM Permissions`
      );
      permissionIds = newPerms.map((p) => p.id);
    } else {
      permissionIds = permissions.map((p) => p.id);
    }

    // Step 2: Create Super Admin Role
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "Super Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const [roles] = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE name='Super Admin'`
    );
    const superAdminRoleId = roles[0].id;

    // Step 3: Assign all permissions to Super Admin role
    await queryInterface.bulkInsert(
      "RolePermissions",
      permissionIds.map((pid) => ({
        roleId: superAdminRoleId,
        permissionId: pid,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );

    // Step 4: Create Super Admin user
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Super Admin",
          email: "admin@sws.com",
          password: passwordHash,
          roleId: superAdminRoleId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", { email: "admin@example.com" });
    await queryInterface.bulkDelete("Roles", { name: "Super Admin" });
  },
};
