import { Sequelize } from 'sequelize'
import config from '@/config/config'
import { UserFactory } from '@/models/user.model'
import { RoleFactory } from '@/models/role.model'

const sequelize = new Sequelize(
  `postgres://${config.db.user}:${config.db.password}@localhost:${config.db.port}/${config.db.name}`,
  {
    logging: false,
  },
)

const User = UserFactory(sequelize)
const Role = RoleFactory(sequelize)

export default sequelize
export { User, Role }
