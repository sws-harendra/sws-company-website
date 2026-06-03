"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const newPermissions = [
      "create_role",
      "assign_permission",
      "edit_users",
      "edit_banners",
      "view_banners",
      "delete_banners",
      "create_banners",
      "edit_hero_section",
      "view_hero_section",
      "delete_hero_section",
      "create_hero_section",
      "create_blog",
      "edit_blog",
      "view_blog",
      "delete_blog",
      "edit_clients",
      "view_clients",
      "delete_clients",
      "create_clients",
      "edit_testimonials",
      "view_testimonials",
      "delete_testimonials",
      "create_testimonials",
      "view_invoices",
      "create_invoices",
      "edit_invoices",
      "delete_invoices",
      "add_portfolio_item",
      "edit_portfolio_item",
      "view_portfolio_item",
      "delete_portfolio_item",
      "edit_contact",
      "view_contact",
      "delete_contact",
      "create_contact",
      "edit_our_team",
      "view_our_team",
      "delete_our_team",
      "create_our_team",
    ];

    // Insert only those not already existing
    for (const perm of newPermissions) {
      const [existing] = await queryInterface.sequelize.query(
        `SELECT id FROM Permissions WHERE name='${perm}'`
      );
      if (existing.length === 0) {
        await queryInterface.bulkInsert(
          "Permissions",
          [
            {
              name: perm,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          {}
        );
      }
    }

    // Assign newly added permissions to Super Admin
    const [role] = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE name='Super Admin'`
    );
    
    if (role && role.length > 0) {
      const superAdminRoleId = role[0].id;

      const [permissions] = await queryInterface.sequelize.query(
        `SELECT id FROM Permissions WHERE name IN ('${newPermissions.join(
          "','"
        )}')`
      );

      if (permissions && permissions.length > 0) {
        await queryInterface.bulkInsert(
          "RolePermissions",
          permissions.map((p) => ({
            roleId: superAdminRoleId,
            permissionId: p.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          }))
        );
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Permissions", {
      name: ["create_role", "assign_permission"],
    });
  },
};
