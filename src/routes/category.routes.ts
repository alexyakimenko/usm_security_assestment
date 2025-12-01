import { Router } from 'express'
import * as controller from '@/controllers/category.controller'
import { isAdmin } from '@/middleware/auth.middleware'
import {
  createCategoryValidator,
  updateCategoryValidator,
} from '@/validators/category.validator'
import validate from '@/middleware/validate.middleware'

const router = Router()

router.get('/', controller.list)
router.get('/create', isAdmin, controller.renderCreate)
router.post(
  '/',
  isAdmin,
  createCategoryValidator,
  validate({
    failureRedirect: 'categories/create',
    failureFlash: true,
  }),
  controller.create,
)
router.post('/:id/subscribe', controller.subscribe)
router.post('/:id/unsubscribe', controller.unsubscribe)
router.get('/:id/edit', isAdmin, controller.renderEdit)
router.post(
  '/:id',
  isAdmin,
  updateCategoryValidator,
  validate({ failureFlash: true }),
  controller.update,
)
router.post('/:id/delete', isAdmin, controller.destroy)

export default router
