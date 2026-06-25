"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Create BlockedIps table
    await queryInterface.createTable("BlockedIps", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ipAddress: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      blockedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });

    // 2. Create SystemLogs table
    await queryInterface.createTable("SystemLogs", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ipAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      query: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      userAgent: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      os: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      browser: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      device: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isBlocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });

    // 3. Add 'manage_security' to permissions table
    const [existingPerms] = await queryInterface.sequelize.query(
      `SELECT id FROM Permissions WHERE name='manage_security'`
    );

    if (existingPerms.length === 0) {
      await queryInterface.bulkInsert("Permissions", [
        {
          name: "manage_security",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      // Assign 'manage_security' to the Super Admin role (role name = 'Super Admin')
      const [superAdminRole] = await queryInterface.sequelize.query(
        `SELECT id FROM Roles WHERE name='Super Admin'`
      );

      if (superAdminRole.length > 0) {
        const [insertedPerm] = await queryInterface.sequelize.query(
          `SELECT id FROM Permissions WHERE name='manage_security'`
        );
        
        if (insertedPerm.length > 0) {
          await queryInterface.bulkInsert("RolePermissions", [
            {
              roleId: superAdminRole[0].id,
              permissionId: insertedPerm[0].id,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]);
        }
      }
    }
  },

  async down(queryInterface, Sequelize) {
    // 1. Delete RolePermissions mapping first if it exists
    const [perm] = await queryInterface.sequelize.query(
      `SELECT id FROM Permissions WHERE name='manage_security'`
    );
    if (perm.length > 0) {
      await queryInterface.bulkDelete("RolePermissions", {
        permissionId: perm[0].id,
      });
    }

    // 2. Delete Permissions entry
    await queryInterface.bulkDelete("Permissions", { name: "manage_security" });

    // 3. Drop tables
    await queryInterface.dropTable("SystemLogs");
    await queryInterface.dropTable("BlockedIps");
  },
};
