import express from 'express'

export const authViews = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.locals.user = req.user
  next()
}
