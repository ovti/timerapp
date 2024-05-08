'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Category extends Model {}

Category.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(16),
      validate: {
        len: [3, 16],
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    updatedAt: false,
    modelName: 'Category',
    tableName: 'categories',
  }
);

module.exports = Category;
