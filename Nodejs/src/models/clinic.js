'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Clinics.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.TEXT,
    descriptionHTML: DataTypes.TEXT,
    descriptionMarkdown: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Clinics',
  });
  return Clinics;
};
/**Tao bang clinics */