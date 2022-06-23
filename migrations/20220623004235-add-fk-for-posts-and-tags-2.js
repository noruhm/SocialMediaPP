'use strict';

module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('Post_tags', {
      fields: ['TagId'],
      type: 'foreign key',
      name: 'fkey_tag_post',
      references: {
        table: 'Tags',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

   down (queryInterface, Sequelize) {
   return queryInterface.removeConstarint('Post_tags', 'fkey_tag_post')
  }
};
