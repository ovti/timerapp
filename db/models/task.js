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
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sessionsToComplete: {
      type: DataTypes.INTEGER,
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
