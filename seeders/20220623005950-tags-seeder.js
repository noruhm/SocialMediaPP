'use strict';

const fs = require('fs')

module.exports = {
   up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./tags.json'))
    data.forEach(e => {
      e.createdAt = new Date(),
      e.updatedAt = new Date()
    });

    return queryInterface.bulkInsert('Tags', data)

  },

   down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tags')
  }
};
