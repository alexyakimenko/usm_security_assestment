import express from 'express'
import {
  AppErrorLog,
  HttpErrorLog,
  Role,
  User,
  UserActionLog,
} from '@/models'

const LOG_LIMIT = 50

export const index = async (_req: express.Request, res: express.Response) => {
  const [userLogs, httpLogs, appErrors] = await Promise.all([
    UserActionLog.findAll({
      include: [
        { model: User, attributes: ['id', 'username'] },
        { model: Role, attributes: ['name'] },
      ],
      order: [['createdAt', 'DESC']],
      limit: LOG_LIMIT,
    }),
    HttpErrorLog.findAll({
      order: [['createdAt', 'DESC']],
      limit: LOG_LIMIT,
    }),
    AppErrorLog.findAll({
      order: [['createdAt', 'DESC']],
      limit: LOG_LIMIT,
    }),
  ])

  res.render('pages/logs/index', {
    userLogs,
    httpLogs,
    appErrors,
    limit: LOG_LIMIT,
  })
}
