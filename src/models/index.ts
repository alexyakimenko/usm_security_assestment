import { Sequelize } from 'sequelize'
import config from '@/config/config'
import { UserFactory } from '@/models/user.model'

const sequelize = new Sequelize(
  `postgres://${config.db.user}:${config.db.password}@localhost:${config.db.port}/${config.db.name}`,
  {
    logging: false,
  },
)

const User = UserFactory(sequelize)

export default sequelize
export { User }
