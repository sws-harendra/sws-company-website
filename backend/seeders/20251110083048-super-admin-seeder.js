"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1️⃣ Define default permissions (deduplicated)
    const defaultPermissions = [
      "manage_users",
      "manage_roles",
      "manage_permissions",
      "manage_jobs",
      "view_dashboard",
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

    // 2️⃣ Insert missing permissions
    const [existingPerms] = await queryInterface.sequelize.query(
      `SELECT name, id FROM Permissions`
    );
    const existingNames = existingPerms.map((p) => p.name);
    const missingPermissions = defaultPermissions.filter(
      (p) => !existingNames.includes(p)
    );

    if (missingPermissions.length > 0) {
      await queryInterface.bulkInsert(
        "Permissions",
        missingPermissions.map((name) => ({
          name,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))
      );
    }

    // 3️⃣ Get all permission IDs from DB (after insert)
    const [allPermissions] = await queryInterface.sequelize.query(
      `SELECT id FROM Permissions`
    );
    const permissionIds = allPermissions.map((p) => p.id);

    // 4️⃣ Insert Super Admin role if not exists
    const [roles] = await queryInterface.sequelize.query(
      `SELECT id FROM Roles WHERE name='Super Admin'`
    );
    let superAdminRoleId;
    if (roles.length === 0) {
      await queryInterface.bulkInsert("Roles", [
        { name: "Super Admin", createdAt: new Date(), updatedAt: new Date() },
      ]);
      const [newRoles] = await queryInterface.sequelize.query(
        `SELECT id FROM Roles WHERE name='Super Admin'`
      );
      superAdminRoleId = newRoles[0].id;
    } else {
      superAdminRoleId = roles[0].id;
    }

    // 5️⃣ Assign all permissions to Super Admin role (skip existing)
    const [existingRolePerms] = await queryInterface.sequelize.query(
      `SELECT permissionId FROM RolePermissions WHERE roleId=${superAdminRoleId}`
    );
    const existingRolePermIds = existingRolePerms.map((rp) => rp.permissionId);
    const toInsertRolePerms = permissionIds
      .filter((id) => !existingRolePermIds.includes(id))
      .map((pid) => ({
        roleId: superAdminRoleId,
        permissionId: pid,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    if (toInsertRolePerms.length > 0) {
      await queryInterface.bulkInsert("RolePermissions", toInsertRolePerms);
    }

    // 6️⃣ Insert Super Admin user if not exists
    const [existingUser] = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE email='admin@sws.com'`
    );
    if (existingUser.length === 0) {
      const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await queryInterface.bulkInsert("Users", [
        {
          name: "Super Admin",
          email: "admin@sws.com",
          password: passwordHash,
          roleId: superAdminRoleId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    // Delete user
    await queryInterface.bulkDelete("Users", { email: "admin@sws.com" });

    // Delete role
    await queryInterface.bulkDelete("Roles", { name: "Super Admin" });

    // Optionally, delete all the permissions added (comment if you want to keep)
    // await queryInterface.bulkDelete("Permissions", {
    //   name: [
    //     "manage_users","manage_roles","manage_permissions","manage_jobs","view_dashboard",
    //     "create_role","assign_permission","edit_users","edit_banners","view_banners",
    //     "delete_banners","create_banners","edit_hero_section","view_hero_section","delete_hero_section",
    //     "create_hero_section","create_blog","edit_blog","view_blog","delete_blog",
    //     "edit_clients","view_clients","delete_clients","create_clients","edit_testimonials",
    //     "view_testimonials","delete_testimonials","create_testimonials",
    //     "view_invoices","create_invoices","edit_invoices","delete_invoices",
    //     "add_portfolio_item","edit_portfolio_item","view_portfolio_item","delete_portfolio_item",
    //     "edit_contact","view_contact","delete_contact","create_contact",
    //     "edit_our_team","view_our_team","delete_our_team","create_our_team"
    //   ]
    // });
  },
};
