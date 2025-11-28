import { DataTypes, Model, Sequelize } from 'sequelize'

export enum UserActionType {
  Login = 'LOGIN',
  LoginFailed = 'LOGIN_FAILED',
  Logout = 'LOGOUT',
  CreateNews = 'CREATE_NEWS',
  UpdateNews = 'UPDATE_NEWS',
  DeleteNews = 'DELETE_NEWS',
  SubscribeCategory = 'SUBSCRIBE_CATEGORY',
  UnsubscribeCategory = 'UNSUBSCRIBE_CATEGORY',
}

export class UserActionLog extends Model {
  public id!: number
  public user_id!: number | null
  public role_id!: number | null
  public action_type!: UserActionType
  public action_details!: string | null
  public ip_address!: string
  public user_agent!: string | null
  public createdAt!: Date
}

export const UserActionLogFactory = (sequelize: Sequelize) => {
  UserActionLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      action_type: {
        type: DataTypes.ENUM(...Object.values(UserActionType)),
        allowNull: false,
      },
      action_details: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
      ip_address: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      user_agent: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'user_action_logs',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
      underscored: true,
    },
  )

  return UserActionLog
}
