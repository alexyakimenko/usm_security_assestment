import express from 'express'
import config from '@/config/config'
import sequelize from '@/models'
import * as path from 'node:path'

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index')
})

sequelize.sync({ alter: true }).then(async () => {
  app.listen(config.app.port, () => {
    console.log(`Server running at http://localhost:${config.app.port}`)
  })
})
