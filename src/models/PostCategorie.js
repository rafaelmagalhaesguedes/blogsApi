module.exports = (sequelize, DataTypes) => {
  const PostCategorieModels = sequelize.define('PostCategorie', {
    name: DataTypes.STRING
  }, {
    tableName: 'categories',
    timestamps: false,
    underscored: true,  
  });

  return PostCategorieModels;
};