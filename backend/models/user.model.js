module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      resetPasswordToken: { type: DataTypes.STRING, allowNull: true },
      resetPasswordExpires: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: "Users",
      timestamps: true, // ✅ important
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: "roleId" });
  };

  return User;
};
