'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Tag)
      Post.belongsTo(models.User)
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: 'Title is Required'
        },
        notEmpty:{
          msg:'Title is Required'
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg: 'Title is Required'
        },
        notEmpty:{
          msg:'Title is Required'
        }
      }
    },
    location: DataTypes.STRING,
    TagId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate :(data, options) =>{

      }
    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};