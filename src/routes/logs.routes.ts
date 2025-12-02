import { Router } from 'express'
import * as controller from '@/controllers/logs.controller'
import { isAdmin, isAuth } from '@/middleware/auth.middleware'

const router = Router()

router.get('/', isAuth, isAdmin, controller.index)

export default router
