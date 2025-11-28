import { NextFunction, Router } from 'express'
import * as controller from '@/controllers/auth.controller'
import { Request, Response } from 'express'
import passport from 'passport'
import { loginValidator } from '@/validators/user.validator'
import validate from '@/middleware/validate.middleware'

const router = Router()

router.get('/signup', controller.renderRegister)
router.get('/login', controller.renderLogin)

router.post(
  '/login',
  loginValidator,
  validate({
    failureRedirect: '/auth/login',
  }),
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  }),
)

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

export default router
