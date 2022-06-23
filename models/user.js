'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post)
    }
  }
  User.init({
    username:{ 
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate:{
        notEmpty: {msg: 'Masukkan username'},
        is: {args: ["^[a-zA-Z0-9_.-]*$",'i'], msg:'Username tidak boleh mengandung simbol'}
      }
    },
    email: { 
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {msg: 'Masukkan email'},
        isEmail: {msg: 'Format bukan email!'}  
      }
    },
    password: { 
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty: {msg: 'Masukkan password'},
        len: {args: [6, 12], msg: 'Panjang password harus 8-12 karakter'}
      }
    },
    role: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(instance){
        const salt = bcrypt.genSaltSync(5);
        const hash = bcrypt.hashSync(instance.password, salt);

        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};