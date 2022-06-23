'use strict';
const fs = require('fs')
const bcrypt = require('bcryptjs')

module.exports = {
  up (queryInterface, Sequelize) {

    let data = JSON.parse(fs.readFileSync('./users.json'))
    data.forEach(el => {
      const salt = bcrypt.genSaltSync(5);
      const hash = bcrypt.hashSync(el.password, salt);

      el.password = hash

      el.createdAt = new Date(),
      el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert('Users', data)
  },

  down (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Users', null)
  }
};
