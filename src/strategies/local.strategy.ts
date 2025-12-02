import passport from 'passport'
import { Role, User } from '@/models'
import { Strategy } from 'passport-local'
import bcrypt from 'bcrypt'
import logger from '@/utils/logger'
import { UserActionType } from '@/models/user-action-log.model'

passport.serializeUser((user, done) => {
  //@ts-ignore
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id as number, {
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['name'],
        through: { attributes: [] },
      },
    ],
  })

  if (!user) {
    return done(null, null)
  }

  return done(null, user)
})

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username: username } })

      if (!user) {
        logger
          .userAction(
            UserActionType.LoginFailed,
            'Неправильный логин или пароль',
          )
          .then()
        return done(null, false, {
          message: 'Неправильный логин или пароль',
        })
      }

      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) {
        logger
          .userAction(
            UserActionType.LoginFailed,
            'Неправильный логин или пароль',
          )
          .then()
        return done(null, false, {
          message: 'Неправильный логин или пароль',
        })
      }

      logger.setUserId(user.id.toString())
      logger
        .userAction(
          UserActionType.Login,
          'User successfully logged in: id = ' + user.id,
        )
        .then()
      return done(null, user)
    } catch (error) {
      logger.appError('Authentication Error', 'Something went wrong').then()

      return done(error)
    }
  }),
)
