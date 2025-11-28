import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

interface ValidateConfig {
  failureRedirect: string
}

const validate =
  ({ failureRedirect }: ValidateConfig) =>
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
      return res.redirect(failureRedirect)
    }
    next()
  }

export default validate
