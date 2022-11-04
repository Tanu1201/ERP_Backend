'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Leave,{
        foreignKey:"userId"
      })
    
    User.hasMany(models.Leave,{
      foreignKey:"adminId"
    })
  }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type:DataTypes.ENUM(['EMPLOYEE','ADMIN']),
      allowNull:false
    },
    token:{
      type:DataTypes.STRING,
      defaultValue:null
    },
    position: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};