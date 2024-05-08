'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('timer_sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      taskId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tasks',
          key: 'id',
        },
      },
      time: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('timer_sessions');
  },
};
