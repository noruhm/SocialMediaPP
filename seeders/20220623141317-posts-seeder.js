'use strict';
const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {

    let data = JSON.parse(fs.readFileSync('./posts.json'))
    data.forEach(el => {
      el.createdAt = new Date(),
      el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert('Posts', data)
  },

  down (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Posts', null)
  }
};
