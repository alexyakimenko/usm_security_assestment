import express from 'express'

export const profile = (req: express.Request, res: express.Response) => {
  res.render('pages/profile')
}
