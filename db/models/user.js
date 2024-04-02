const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../db');

const User = sequelize.define(
  'user',
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [3, undefined] },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { len: [3, undefined] },
    },
  },
  {
    timestamps: false,
  }
);

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = User;
