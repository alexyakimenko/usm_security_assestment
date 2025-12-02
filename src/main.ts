import express from 'express'
import config from '@/config/config'
import sequelize, { seeders } from '@/models'
import * as path from 'node:path'
import router from '@/routes'
import session from 'express-session'
import passport from 'passport'
import flash from 'connect-flash'

import '@/strategies/local.strategy'
import { authViews } from '@/middleware/auth.middleware'
import logger from '@/utils/logger'
import setupLogger from '@/middleware/logger.middleware'

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: config.secrets.session,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  }),
)

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(setupLogger)

app.use(authViews)

app.use(router)

sequelize.sync({ alter: true }).then(async () => {
  await seeders()
  app.listen(config.app.port, () => {
    console.log(`Server running at http://localhost:${config.app.port}`)
  })
})
