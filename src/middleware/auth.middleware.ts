import express from 'express'
import { Role } from '@/models/role.model'

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
