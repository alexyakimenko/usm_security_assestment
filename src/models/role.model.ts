import { DataTypes, Model, Sequelize } from 'sequelize'

export class Role extends Model {
  public id!: number
  public name!: string
  public description!: string
}

export const RoleFactory = (sequelize: Sequelize) => {
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING(300),
      },
    },
    {
      sequelize,
      tableName: 'roles',
      timestamps: false,
    },
  )
  return Role
}

export enum Roles {
  Admin = 'admin',
  Editor = 'editor',
  Subscriber = 'subscriber',
}

export const RoleSeeder = async () => {
  return await Promise.all(
    Object.values(Roles).map((role) =>
      Role.findOrCreate({ where: { name: role } }),
    ),
  )
}
