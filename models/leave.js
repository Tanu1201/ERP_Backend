'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Leave.belongsTo(models.User,{
        as:"userLeaves",
        foreignKey:"userId",
        targetKey:"id"
      })
      Leave.belongsTo(models.User,{
        as:"grantedBy",
        foreignKey:"adminId",
        targetKey:"id"
      })
    }
  }
  Leave.init({
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    type: DataTypes.ENUM(['FIRST HALF','SECOND HALF','FULL DAY']),
    date: DataTypes.DATE,
    description: DataTypes.STRING,
    status: {
      type:DataTypes.ENUM(['APPROVED','REJECTED','PENDING']),
      defaultValue:"PENDING"
    },
    adminId: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Leave',
  });
  return Leave;
};