import { DataTypes, Model, Sequelize } from 'sequelize'

export class HttpErrorLog extends Model {
  public id!: number
  public status_code!: number
  public method!: string
  public url!: string
  public ip_address!: string
  public message!: string
  public createdAt!: Date
}

export const HttpErrorLogFactory = (sequelize: Sequelize) => {
  HttpErrorLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      method: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ip_address: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'http_error_logs',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      underscored: true,
    },
  )

  return HttpErrorLog
}
