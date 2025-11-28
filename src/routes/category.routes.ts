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
router.get('/create', controller.renderCreate)
router.post(
  '/',
  createCategoryValidator,
  validate({
    failureRedirect: 'categories/create',
    failureFlash: true,
  }),
  controller.create,
)
router.get('/:id/edit', controller.renderEdit)
router.post(
  '/:id',
  updateCategoryValidator,
  validate({ failureFlash: true }),
  controller.update,
)
router.post('/:id/delete', controller.destroy)

export default router
