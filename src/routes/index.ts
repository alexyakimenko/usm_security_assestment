import { Router, Request, Response } from 'express'
import authRouter from '@/routes/auth.routes'
import userRouter from '@/routes/user.routes'

const router = Router()

router.get('/', (_: Request, res: Response) => {
  res.render('index')
})

router.use('/auth', authRouter)
router.use('/user', userRouter)

// not found page
router.use((_: Request, res: Response) => {
  res.render('pages/404')
})

export default router
