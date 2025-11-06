module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define("Banner", {
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    button1_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    button1_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    button2_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    button2_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Banner;
};
