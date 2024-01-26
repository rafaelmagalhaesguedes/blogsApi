module.exports = (sequelize, DataTypes) => {
  const BlogSpotModels = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  }, {
    tableName: 'blog_posts',
    timestamps: false,
    underscored: true,
  });

  BlogSpotModels.associate = (models) => {
    BlogSpotModels.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }

  return BlogSpotModels;
};