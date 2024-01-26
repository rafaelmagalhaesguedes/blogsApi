module.exports = (sequelize, DataTypes) => {
  const PostCategorieModels = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'BlogPost',
        key: 'id',
      },
      field: 'post_id',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Category',
        key: 'id',
      },
      field: 'category_id',
    },
  }, {
    tableName: 'categories',
    timestamps: false,
    underscored: true,
  });

  PostCategorieModels.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategorieModels,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostCategorieModels,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  }

  return PostCategorieModels;
};