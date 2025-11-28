import { Sequelize } from 'sequelize'
import config from '@/config/config'
import { UserFactory } from '@/models/user.model'
import { RoleFactory, RoleSeeder } from '@/models/role.model'

const sequelize = new Sequelize(
  `postgres://${config.db.user}:${config.db.password}@localhost:${config.db.port}/${config.db.name}`,
  {
    logging: false,
  },
)

const User = UserFactory(sequelize)
const Role = RoleFactory(sequelize)

User.belongsToMany(Role, {
  through: 'user_roles',
  timestamps: false,
  as: 'roles',
})
Role.belongsToMany(User, { through: 'user_roles' })

export const seeders = async () => {
  await Promise.all([await RoleSeeder()])
}

export default sequelize
export { User, Role }
