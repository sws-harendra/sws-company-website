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
    redirect_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    author: {
      type: DataTypes.STRING,
    },
    contactus: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("draft", "published"),
      defaultValue: "draft",
    },
    is_location_blog: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // 🔗 Self-referential many-to-many relation
  Blog.associate = (models) => {
    Blog.belongsToMany(models.Blog, {
      as: "FeaturedBlogs",
      through: "FeaturedBlogRelations",
      foreignKey: "blogId",
      otherKey: "featuredBlogId",
    });
  };

  return Blog;
};
