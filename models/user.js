'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    models.user.hasMany(models.garden)
  };
  return user;
};