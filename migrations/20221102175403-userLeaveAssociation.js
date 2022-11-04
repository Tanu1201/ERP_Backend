'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Leaves","userId",{
      type:Sequelize.INTEGER,
      references:{
        model:"Users",
        key:"id",
        allowNull:false,
        autoIncrement:true
      }
      
    })
    await queryInterface.addColumn("Leaves","adminId",{
      type:Sequelize.INTEGER,
      references:{
        model:"Users",
        key:"id",
        allowNull:false,
        autoIncrement:true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Leaves","userId")
    await queryInterface.removeColumn("Leaves","adminId")


  }
};
