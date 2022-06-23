'use strict';

module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('Post_tags', {
      fields: ['PostId'],
      type: 'foreign key',
      name: 'fkey_post_tag',
      references: {
        table: 'Posts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

   down (queryInterface, Sequelize) {
   return queryInterface.removeConstraint('Post_tags', 'fkey_post_tag')
  }
};
