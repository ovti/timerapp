'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class category extends Model {
  static associate(models) {
    category.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

category.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    updatedAt: false,
    modelName: 'category',
    tableName: 'categories',
  }
);

module.exports = category;
