'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Category extends Model {
  static associate(models) {
    Category.belongsTo(models.User, { foreignKey: 'userId' });
    Category.hasMany(models.TimerSession, { foreignKey: 'categoryId' });
  }
}

Category.init(
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
    modelName: 'Category',
    tableName: 'categories',
  }
);

module.exports = Category;
