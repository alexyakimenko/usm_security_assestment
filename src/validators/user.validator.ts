import { body } from 'express-validator'

const username = body('username')
  .trim()
  .notEmpty()
  .withMessage('Логин обязателен')
  .isLength({ min: 3, max: 30 })
  .withMessage('Логин должен быть длиной от 3 до 30')

const password = body('password')
  .trim()
  .notEmpty()
  .withMessage('Пароль обязателен')
  .isLength({ min: 8 })
  .withMessage('Пароль должен быть как минимум 8 символов')
  .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  .withMessage(
    'Пароль должен содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ',
  )

const passwordConfirm = body('password_confirm')
  .trim()
  .notEmpty()
  .withMessage('Подтверждение пароля необходимо')

const email = body('email')
  .trim()
  .notEmpty()
  .withMessage('Почта обязательна')
  .isEmail()
  .withMessage('Неверный формат почты')
  .normalizeEmail()

export const createUserValidator = [username, password, passwordConfirm, email]
export const loginValidator = [username, password]
