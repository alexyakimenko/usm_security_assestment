import { Router } from 'express'
import * as controller from '@/controllers/category.controller'
import { isAdmin, isAuth } from '@/middleware/auth.middleware'
import {
  createCategoryValidator,
  updateCategoryValidator,
} from '@/validators/category.validator'
import validate from '@/middleware/validate.middleware'

const router = Router()

router.get('/', controller.list)
router.get('/create', isAuth, isAdmin, controller.renderCreate)
router.post(
  '/',
  isAuth,
  isAdmin,
  createCategoryValidator,
  validate({
    failureRedirect: 'categories/create',
    failureFlash: true,
  }),
  controller.create,
)
router.get('/:id/edit', isAuth, isAdmin, controller.renderEdit)
router.post(
  '/:id',
  isAuth,
  isAdmin,
  updateCategoryValidator,
  validate({ failureFlash: true }),
  controller.update,
)
router.post('/:id/delete', isAuth, isAdmin, controller.destroy)

export default router
