import { Router } from 'express'
import * as controller from '@/controllers/auth.controller'

const router = Router()

router.get('/signup', controller.renderRegister)
router.get('/login', controller.renderLogin)

export default router
