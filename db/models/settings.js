'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

class Settings extends Model {}

Settings.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    breakDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alarmSound: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    autoResume: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'Settings',
    tableName: 'settings',
  }
);

Settings.belongsTo(User, { foreignKey: 'userId' });

module.exports = Settings;
