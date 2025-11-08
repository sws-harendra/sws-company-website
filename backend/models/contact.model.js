module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("Contact", {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pageUsed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Contact;
};
