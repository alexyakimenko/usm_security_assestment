import express from 'express'
import logger from '@/utils/logger'

const setupLogger = (
  req: express.Request,
  _: express.Response,
  next: express.NextFunction,
): void => {
  logger.setUserData({
    ip_address: req.ip,
    user_agent: req.get('User-Agent'),
    user_id: (req.user as any)?.id,
  })
  next()
}

export default setupLogger
