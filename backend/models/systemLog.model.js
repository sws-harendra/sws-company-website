module.exports = (sequelize, DataTypes) => {
  const SystemLog = sequelize.define(
    "SystemLog",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      ipAddress: { type: DataTypes.STRING, allowNull: true },
      method: { type: DataTypes.STRING, allowNull: false },
      path: { type: DataTypes.STRING, allowNull: false },
      query: { type: DataTypes.TEXT, allowNull: true },
      body: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.INTEGER, allowNull: true },
      duration: { type: DataTypes.INTEGER, allowNull: true },
      userAgent: { type: DataTypes.STRING, allowNull: true },
      userId: { type: DataTypes.INTEGER, allowNull: true },
      isBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: "SystemLogs",
      timestamps: true,
    }
  );

  SystemLog.associate = (models) => {
    SystemLog.belongsTo(models.User, { foreignKey: "userId", onDelete: "SET NULL" });
  };

  return SystemLog;
};
