import { Sequelize } from 'sequelize'
import config from '@/config/config'
import { UserFactory } from '@/models/user.model'
import { RoleFactory, RoleSeeder } from '@/models/role.model'
import { CategoryFactory } from '@/models/category.model'
import { NewsFactory } from '@/models/new.model'
import { UserActionLogFactory } from '@/models/user-action-log.model'
import { AppErrorLogFactory } from '@/models/app-error-log.model'
import { HttpErrorLogFactory } from '@/models/http-error-log.model'

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
const UserActionLog = UserActionLogFactory(sequelize)
const AppErrorLog = AppErrorLogFactory(sequelize)
const HttpErrorLog = HttpErrorLogFactory(sequelize)

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

User.hasMany(UserActionLog, {
  foreignKey: 'user_id',
})

Role.hasMany(UserActionLog, {
  foreignKey: 'role_id',
})

UserActionLog.belongsTo(User, {
  foreignKey: 'user_id',
})

UserActionLog.belongsTo(Role, {
  foreignKey: 'role_id',
})
export const seeders = async () => {
  await Promise.all([await RoleSeeder()])
}

export default sequelize
export {
  User,
  Role,
  Category,
  News,
  UserActionLog,
  AppErrorLog,
  HttpErrorLog,
}
