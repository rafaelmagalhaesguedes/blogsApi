module.exports = (sequelize, DataTypes) => {  
  const CategorieModels = sequelize.define('Categorie',{
    name: DataTypes.STRING
  }, {
    tableName: 'categories',
    timestamps: false,
    underscored: true,  
  });

  return CategorieModels;
};