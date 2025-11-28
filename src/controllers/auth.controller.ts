import express from 'express'

export const renderRegister = async (
  req: express.Request,
  res: express.Response,
) => {
  res.render('pages/signup')
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
