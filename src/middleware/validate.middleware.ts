import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

interface ValidateConfig {
  failureRedirect: string
  failureFlash?: boolean
}

const validate =
  ({ failureRedirect, failureFlash = false }: ValidateConfig) =>
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        if (error.type === 'field') {
          req.flash(error.path, error.msg)
        } else {
          req.flash('error', error.msg)
        }
      })
      if (failureFlash) {
        req.flash('prev', req.body)
      }
      return res.redirect(failureRedirect)
    }
    next()
  }

export default validate
