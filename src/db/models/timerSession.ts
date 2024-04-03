import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class TimerSession extends Model {
  static associate(models: any) {
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
  },
  {
    sequelize,
    timestamps: true,
    updatedAt: false,
    modelName: 'TimerSession',
    tableName: 'timer_sessions',
  }
);

export default TimerSession;
