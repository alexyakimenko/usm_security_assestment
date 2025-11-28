import { Router } from 'express'
import * as controller from '@/controllers/user.controller'

const router = Router()

router.get('/profile', controller.myProfile)
router.get('/profile/:username', controller.profile)
router.post('/remove/:id', controller.remove)

export default router
