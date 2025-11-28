import { Router } from 'express'
import * as controller from '@/controllers/user.controller'

const router = Router()

router.get('/profile', controller.profile)

export default router
