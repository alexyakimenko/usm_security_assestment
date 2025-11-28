import { Model, DataTypes, Sequelize } from 'sequelize'

export class News extends Model {
  public id!: number
  public title!: string
  public content!: string
  public category_id!: number
  public author_id!: number
  public createdAt!: Date
  public updatedAt!: Date
}

export const NewsFactory = (sequelize: Sequelize) => {
  News.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 100],
        },
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
        validate: {
          len: [1, 10000],
        },
      },
      author_id: {
        type: DataTypes.INTEGER,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'news',
      timestamps: true,
      underscored: true,
    },
  )

  return News
}
