'use strict';
const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../db');

class User extends Model {}

User.init(
  {
    username: {
      type: Sequelize.STRING(16),
      allowNull: false,
      unique: true,
      validate: { len: [3, 16] },
    },
    password: {
      type: Sequelize.STRING(64),
      allowNull: false,
      validate: { len: [3, 64] },
    },
  },
  {
    sequelize,
    modelName: 'user',
    timestamps: false,
  }
);

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = User;
