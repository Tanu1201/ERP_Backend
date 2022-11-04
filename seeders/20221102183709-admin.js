'use strict';
const {hash}= require("bcrypt")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert("Users",
    [
      {
        name:"dhruvil",
        email:"dhruvil@gkmit.co",
        password: await hash("gkmit@10",10),
        role:"ADMIN",
        position:"FULL STACK DEVELOPER",
        createdAt:new Date(),
        updatedAt: new Date()
      }
    ]


   )
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Users', null, {});
     
  }
};
