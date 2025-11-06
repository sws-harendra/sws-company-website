module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define(
    "Portfolio",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      redirect_url: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //   isUrl: true,
        // },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "portfolios",
      timestamps: true,
    }
  );

  return Portfolio;
};
