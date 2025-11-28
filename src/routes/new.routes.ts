import { Router } from 'express'
import * as controller from '@/controllers/new.controller'
import { isAdmin, isAuth } from '@/middleware/auth.middleware'
import {
  createNewsValidator,
  updateNewsValidator,
} from '@/validators/new.validator'
import validate from '@/middleware/validate.middleware'

const router = Router()

router.get('/', controller.list)
router.get('/create', isAuth, isAdmin, controller.renderCreate)
router.post(
  '/',
  createNewsValidator,
  validate({ failureRedirect: 'news/create', failureFlash: true }),
  controller.create,
)
router.get('/:id/edit', isAuth, isAdmin, controller.renderEdit)
router.post(
  '/:id',
  updateNewsValidator,
  validate({ failureFlash: true }),
  controller.update,
)
router.post('/:id/delete', isAuth, isAdmin, controller.destroy)

export default router
