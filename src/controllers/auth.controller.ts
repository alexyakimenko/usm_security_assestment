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
  res.render('pages/login')
}
