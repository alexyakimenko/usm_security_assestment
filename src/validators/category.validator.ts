import { body } from 'express-validator'
import { Category } from '@/models/category.model'

const name = body('name')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('Name is required.')
  .isLength({ max: 30 })
  .withMessage('Name must be 30 characters or fewer.')
  .custom(async (value, { req }) => {
    const currentId = req.params?.id ? Number(req.params.id) : undefined
    const existing = await Category.findOne({ where: { name: value } })
    if (existing && existing.id !== currentId) {
      throw new Error('Category name must be unique.')
    }
    return true
  })

const description = body('description')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('Description is required.')
  .isLength({ min: 1, max: 5000 })
  .withMessage('Description must be between 1 and 5000 characters.')

export const createCategoryValidator = [name, description]
export const updateCategoryValidator = [name, description]
