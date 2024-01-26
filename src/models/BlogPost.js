module.exports = (sequelize, DataTypes) => {
  const BlogSpotModels = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.STRING
  }, {
    tableName: 'blog_posts',
    timestamps: false,
    underscored: true,
  });

  return BlogSpotModels;
};