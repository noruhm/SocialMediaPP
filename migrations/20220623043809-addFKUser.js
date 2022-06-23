'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Posts', 'TagId', {
      type: Sequelize.INTEGER, 
      references:{
        model: "Tags"
      }
      });
      await queryInterface.addColumn('Posts', 'UserId', {
        type: Sequelize.INTEGER, 
        references:{
          model: "Users"
        }
        });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Posts', 'TagId')
    await queryInterface.removeColumn('Posts', 'UserId')
  }
};
