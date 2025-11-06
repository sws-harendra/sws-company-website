module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("Blog", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    short_description: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("draft", "published"),
      defaultValue: "draft",
    },
  });

  return Blog;
};
