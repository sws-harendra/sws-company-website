module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("Blog", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title_color: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
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
    keywords: {
      type: DataTypes.TEXT,
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

  // Self-healing: verify title_color column exists in Blogs table
  setTimeout(() => {
    try {
      sequelize.getQueryInterface().describeTable("Blogs").then((tableInfo) => {
        if (tableInfo && !tableInfo.title_color) {
          sequelize.getQueryInterface().addColumn("Blogs", "title_color", {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: null,
          }).catch(() => {});
        }
      }).catch(() => {});
    } catch {}
  }, 1000);

  return Blog;
};
