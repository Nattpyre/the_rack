/* eslint-disable new-cap */

import DataType from 'sequelize';
import Model from '../sequelize';

const Product = Model.define('Product', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  description: {
    type: DataType.TEXT,
    allowNull: true,
  },

  gender: {
    type: DataType.ENUM('male', 'female', 'unisex'),
    defaultValue: 'unisex',
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  price: {
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      isDecimal: true,
    },
  },

  size: {
    type: DataType.ENUM('XS', 'S', 'M', 'L', 'XL'),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  color: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  photos: {
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },

  article: {
    type: DataType.STRING(64),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

}, {

  indexes: [
    { fields: ['name', 'article'] },
  ],

});

export default Product;
