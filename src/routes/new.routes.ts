import { Router } from 'express'
import * as controller from '@/controllers/new.controller'
import { isAdmin, isAuth, isEditor } from '@/middleware/auth.middleware'
import {
  createNewsValidator,
  updateNewsValidator,
} from '@/validators/new.validator'
import validate from '@/middleware/validate.middleware'

const router = Router()

router.get('/', controller.list)
router.get('/create', isAuth, isEditor, controller.renderCreate)
router.post(
  '/',
  isAuth,
  isEditor,
  createNewsValidator,
  validate({ failureRedirect: 'news/create', failureFlash: true }),
  controller.create,
)
router.get('/:id/edit', isAuth, isEditor, controller.renderEdit)
router.post(
  '/:id',
  isAuth,
  isEditor,
  updateNewsValidator,
  validate({ failureFlash: true }),
  controller.update,
)
router.post('/:id/delete', isAuth, isEditor, controller.destroy)
router.get('/:id', controller.show)

export default router
