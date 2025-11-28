import { Model, DataTypes, Sequelize } from 'sequelize'

export class Category extends Model {
  public id!: number
  public name!: string
  public description!: string
  public createdAt!: Date
  public updatedAt!: Date
}

export const CategoryFactory = (sequelize: Sequelize) => {
  Category.init(
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
        validate: {
          len: [1, 30],
        },
      },
      description: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
        validate: {
          len: [1, 5000],
        },
      },
    },
    {
      sequelize,
      tableName: 'categories',
      timestamps: true,
      underscored: true,
    },
  )

  return Category
}
