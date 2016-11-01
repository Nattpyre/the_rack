/* eslint-disable new-cap */

import DataType from 'sequelize';
import Model from '../sequelize';

const Brand = Model.define('Brand', {

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

  logo: {
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
    validate: {
      isUrl: true,
    },
  },

  vanityName: {
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    set() {
      const name = this.name.replace(/\W/g, '');

      this.setDataValue('vanityName', name.toLowerCase());
    },
  },

}, {

  indexes: [
    { fields: ['vanityName'] },
  ],

});

export default Brand;
