import { Router } from 'express'
import * as controller from '@/controllers/user.controller'
import { isAdmin, isAuth } from '@/middleware/auth.middleware'

const router = Router()

router.get('/profile', isAuth, controller.myProfile)
router.get('/profile/:username', isAuth, isAdmin, controller.profile)
router.post('/remove/:id', isAuth, isAdmin, controller.remove)
router.get('/edit/:username', isAuth, isAdmin, controller.editProfile)
router.post('/edit/:id', isAuth, isAdmin, controller.edit)
router.get('/', isAuth, isAdmin, controller.list)

export default router
