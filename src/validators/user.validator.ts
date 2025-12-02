import { body } from 'express-validator'

const username = body('username')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('Логин обязателен')
  .isLength({ min: 3, max: 30 })
  .withMessage('Логин должен быть длиной от 3 до 30')

const password = body('password')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('Пароль обязателен')
  .isLength({ min: 6 })
  .withMessage('Пароль должен быть как минимум 6 символов')

const passwordConfirm = body('password_confirm')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('Подтверждение пароля необходимо')

const email = body('email')
  .trim()
  .escape()
  .notEmpty()
  .withMessage('Почта обязательна')
  .isEmail()
  .withMessage('Неверный формат почты')
  .normalizeEmail()

export const createUserValidator = [username, password, passwordConfirm, email]
export const loginValidator = [username, password]
