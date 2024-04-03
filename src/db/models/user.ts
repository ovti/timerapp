import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../db';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;

  static initialize(sequelize: any) {
    this.init(
      {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: { len: [3, 255] },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: { len: [3, 255] },
        },
      },
      {
        sequelize,
        modelName: 'user',
        timestamps: false,
      }
    );
  }

  static async beforeCreateHook(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
}

User.initialize(sequelize);

User.beforeCreate(User.beforeCreateHook);

export default User;
