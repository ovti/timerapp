'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
class TimerSession extends Model {
  static associate(models) {
    TimerSession.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

TimerSession.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeInSeconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'TimerSession',
    tableName: 'timer_sessions',
  }
);

module.exports = TimerSession;
