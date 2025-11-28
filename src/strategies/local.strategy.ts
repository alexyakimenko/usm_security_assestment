import passport from 'passport'
import { Role, User } from '@/models'
import { Strategy } from 'passport-local'
import bcrypt from 'bcrypt'

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
        return done(null, false, {
          message: 'Неправильный логин или пароль',
        })
      }

      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) {
        return done(null, false, {
          message: 'Неправильный логин или пароль',
        })
      }

      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }),
)
