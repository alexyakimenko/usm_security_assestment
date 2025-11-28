import { DataTypes, Model, Sequelize } from 'sequelize'

export class AppErrorLog extends Model {
  public id!: number
  public error_type!: string
  public message!: string
  public url!: string
  public createdAt!: Date
}

export const AppErrorLogFactory = (sequelize: Sequelize) => {
  AppErrorLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      error_type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'app_error_logs',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      underscored: true,
    },
  )

  return AppErrorLog
}
