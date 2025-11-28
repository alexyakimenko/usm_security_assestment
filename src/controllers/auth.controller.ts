import express from 'express'
import { Role, User } from '@/models'
import { Roles } from '@/models/role.model'
import bcrypt from 'bcrypt'

export const renderRegister = async (
  req: express.Request,
  res: express.Response,
) => {
  const errors = req.flash('error')
  const username_errors = req.flash('username')
  const email_errors = req.flash('email')
  const password_errors = req.flash('password')
  const password_confirm_errors = req.flash('password_confirm')
  const prev = req.flash('prev')[0] || {}
  res.render('pages/signup', {
    errors: {
      general: errors,
      username: username_errors,
      email: email_errors,
      password: password_errors,
      password_confirm: password_confirm_errors,
    },
    prev: prev,
  })
}

export const renderLogin = async (
  req: express.Request,
  res: express.Response,
) => {
  const errors = req.flash('error')
  const username_errors = req.flash('username')
  const password_errors = req.flash('password')
  res.render('pages/login', {
    errors: {
      general: errors,
      username: username_errors,
      password: password_errors,
    },
  })
}

export const logout = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
}

export const register = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { username, email, password, password_confirm } = req.body
  if (password !== password_confirm) {
    req.flash('password_confirm', 'Пароли не совпадают')
    res.redirect('/auth/signup')
  }

  const takenUsername = await User.findOne({ where: { username } })
  if (takenUsername) {
    req.flash('username', 'Имя пользователя уже занято')
    res.redirect('/auth/signup')
  }

  const takenEmail = await User.findOne({ where: { email } })
  if (takenEmail) {
    req.flash('email', 'Почта уже занята')
    res.redirect('/auth/signup')
  }

  const hash = await bcrypt.hash(password, 10)

  const user = await User.create({
    username,
    email,
    password: hash,
  })

  //@ts-ignore
  await user.addRole(await Role.findOne({ where: { name: Roles.Subscriber } }))

  req.login(user, function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
}
