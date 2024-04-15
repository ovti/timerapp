'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class TimerSession extends Model {
  static associate(models) {
    TimerSession.belongsTo(models.User, { foreignKey: 'userId' });
    TimerSession.belongsTo(models.Category, { foreignKey: 'categoryId' });
  }
}

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

module.exports = TimerSession;
