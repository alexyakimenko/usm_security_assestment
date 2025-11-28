import { Router } from 'express'
import * as controller from '@/controllers/auth.controller'
import passport from 'passport'
import {
  createUserValidator,
  loginValidator,
} from '@/validators/user.validator'
import validate from '@/middleware/validate.middleware'

const router = Router()

router.get('/signup', controller.renderRegister)
router.get('/login', controller.renderLogin)
router.post('/logout', controller.logout)
router.post(
  '/signup',
  createUserValidator,
  validate({
    failureRedirect: '/auth/signup',
    failureFlash: true,
  }),
  controller.register,
)

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

export default router
