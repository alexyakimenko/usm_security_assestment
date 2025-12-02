import { body } from 'express-validator'
import { News } from '@/models/new.model'
import { Category } from '@/models/category.model'

const title = body('title')
  .trim()
  .notEmpty()
  .withMessage('Заголовок обязателен.')
  .isLength({ max: 100 })
  .withMessage('Заголовок должен быть не длиннее 100 символов.')
  .custom(async (value, { req }) => {
    const currentId = req.params?.id ? Number(req.params.id) : undefined
    const existing = await News.findOne({ where: { title: value } })
    if (existing && existing.id !== currentId) {
      throw new Error('Новость с таким заголовком уже существует.')
    }
    return true
  })

const content = body('content')
  .trim()
  .notEmpty()
  .withMessage('Содержимое обязательно.')
  .isLength({ min: 1, max: 10000 })
  .withMessage('Содержимое должно быть от 1 до 10000 символов.')

const categoryId = body('category_id')
  .trim()
  .notEmpty()
  .withMessage('Категория обязательна.')
  .bail()
  .isInt()
  .withMessage('Неверная категория.')
  .bail()
  .custom(async (value) => {
    const category = await Category.findByPk(value)
    if (!category) {
      throw new Error('Категория не найдена.')
    }
    return true
  })

export const createNewsValidator = [title, content, categoryId]
export const updateNewsValidator = [title, content, categoryId]
