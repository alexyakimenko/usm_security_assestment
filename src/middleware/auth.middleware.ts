import express from 'express'
import { Role, Roles } from '@/models/role.model'
import { User } from '@/models/user.model'

export const authViews = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.locals.user = req.user
  // @ts-ignore
  const isAdmin = req.user?.roles
    .map((role: Role) => role.name)
    .includes('admin')

  // @ts-ignore
  const isEditor = req.user?.roles
    .map((role: Role) => role.name)
    .includes('editor')

  res.locals.isAdmin = isAdmin
  res.locals.isEditor = isEditor

  next()
}

export const isAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!(req.isAuthenticated && req.isAuthenticated())) {
    req.flash('error', 'Авторизуйтесь, чтобы продолжить.')
    return res.redirect('/auth/login')
  }

  return next()
}

export const isEditor = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user = req.user as User
  // @ts-ignore
  const roles = user.roles as Role[]

  const allowed = roles.some((role) =>
    [Roles.Editor, Roles.Admin].includes(role.name as Roles),
  )

  if (!allowed) {
    req.flash('error', 'У вас нет прав для выполнения этого действия.')
    return res.redirect('/')
  }

  return next()
}

export const isAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // @ts-ignore
  const user = req.user.roles.some((role) => role.name === Roles.Admin)

  if (!user) {
    req.flash('error', 'У вас нет прав для выполнения этого действия.')
    return res.redirect('/')
  }

  return next()
}
