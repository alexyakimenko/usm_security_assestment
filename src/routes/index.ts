import { Router, Request, Response } from 'express'
import authRouter from '@/routes/auth.routes'
import userRouter from '@/routes/user.routes'
import categoryRouter from '@/routes/category.routes'

const router = Router()

router.get('/', (_: Request, res: Response) => {
  res.render('index')
})

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/categories', categoryRouter)

// not found page
router.use((_: Request, res: Response) => {
  res.render('pages/404')
})

export default router
