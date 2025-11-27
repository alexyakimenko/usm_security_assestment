import { Sequelize } from 'sequelize'
import config from '@/config/config'

const sequelize = new Sequelize(
  `postgres://${config.db.user}:${config.db.password}@localhost:${config.db.port}/${config.db.name}`,
  {
    logging: false,
  },
)

export default sequelize
