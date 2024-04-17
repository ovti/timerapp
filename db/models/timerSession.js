'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const Task = require('./task');

class TimerSession extends Model {}

TimerSession.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
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

TimerSession.belongsTo(Task, { foreignKey: 'taskId' });

module.exports = TimerSession;
