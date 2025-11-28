import { Router, Request, Response } from 'express'
import authRouter from '@/routes/auth.routes'
import userRouter from '@/routes/user.routes'
import categoryRouter from '@/routes/category.routes'
import newsRouter from '@/routes/new.routes'
import { isAdmin, isAuth, isEditor } from '@/middleware/auth.middleware'

const router = Router()

router.get('/', (_: Request, res: Response) => {
  res.render('index')
})

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/categories', isAuth, isAdmin, categoryRouter)
router.use('/news', isAuth, isEditor, newsRouter)

// not found page
router.use((_: Request, res: Response) => {
  res.render('pages/404')
})

export default router
