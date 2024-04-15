'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const Category = require('./category');

class TimerSession extends Model {}

TimerSession.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeInSeconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    updatedAt: false,
    modelName: 'TimerSession',
    tableName: 'timer_sessions',
  }
);
TimerSession.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = TimerSession;
