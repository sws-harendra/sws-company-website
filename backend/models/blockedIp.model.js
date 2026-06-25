module.exports = (sequelize, DataTypes) => {
  const BlockedIp = sequelize.define(
    "BlockedIp",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      ipAddress: { type: DataTypes.STRING, allowNull: false, unique: true },
      reason: { type: DataTypes.STRING, allowNull: true },
      blockedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      expiresAt: { type: DataTypes.DATE, allowNull: true }, // Null means permanent
    },
    {
      tableName: "BlockedIps",
      timestamps: true,
    }
  );

  return BlockedIp;
};
