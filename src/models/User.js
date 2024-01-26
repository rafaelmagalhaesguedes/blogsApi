module.exports = (sequelize, DataTypes) => {
  const UserModels = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });

  UserModels.associate = (models) => {
    UserModels.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'blogPosts',
    });
  }

  return UserModels;
};