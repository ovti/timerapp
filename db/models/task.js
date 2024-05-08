'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const Category = require('./category');

class Task extends Model {}

Task.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(32),
      validate: {
        len: [3, 32],
      },
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(64),
      validate: {
        len: [3, 64],
      },
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sessionsToComplete: {
      type: DataTypes.INTEGER(2),
      validate: {
        min: 1,
        max: 99,
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Task',
    tableName: 'tasks',
  }
);

Task.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Task;
