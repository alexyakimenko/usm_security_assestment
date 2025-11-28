import { Sequelize } from 'sequelize'
import config from '@/config/config'
import { UserFactory } from '@/models/user.model'
import { RoleFactory, RoleSeeder } from '@/models/role.model'
import { CategoryFactory } from '@/models/category.model'
import { NewsFactory } from '@/models/new.model'

const sequelize = new Sequelize(
  `postgres://${config.db.user}:${config.db.password}@localhost:${config.db.port}/${config.db.name}`,
  {
    logging: false,
  },
)

const User = UserFactory(sequelize)
const Role = RoleFactory(sequelize)
const Category = CategoryFactory(sequelize)
const News = NewsFactory(sequelize)

User.belongsToMany(Role, {
  through: 'user_roles',
  timestamps: false,
  as: 'roles',
})
Role.belongsToMany(User, { through: 'user_roles' })

Category.hasMany(News, {
  foreignKey: 'category_id',
})

User.hasMany(News, {
  foreignKey: 'author_id',
})

News.belongsTo(Category, {
  foreignKey: 'category_id',
})

News.belongsTo(User, {
  foreignKey: 'author_id',
})
export const seeders = async () => {
  await Promise.all([await RoleSeeder()])
}

export default sequelize
export { User, Role, Category, News }
