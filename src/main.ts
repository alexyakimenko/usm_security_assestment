import express from 'express'
import config from '@/config/config'
import sequelize from '@/models'

const app = express()

sequelize.sync({ alter: true }).then(async () => {
  app.listen(config.app.port, () => {
    console.log(`Server running at http://localhost:${config.app.port}`)
  })
})
