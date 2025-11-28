import { Router, Request, Response } from 'express'
import authRouter from '@/routes/auth.routes'
import userRouter from '@/routes/user.routes'
import categoryRouter from '@/routes/category.routes'
import newsRouter from '@/routes/new.routes'
import { Category } from '@/models/category.model'
import { News } from '@/models/new.model'
import { User } from '@/models/user.model'
import { isAdmin, isAuth, isEditor } from '@/middleware/auth.middleware'

const router = Router()

router.get('/', async (_: Request, res: Response) => {
  const news = await News.findAll({
    include: [
      { model: Category, attributes: ['name'] },
      { model: User, attributes: ['username'] },
    ],
    order: [['createdAt', 'DESC']],
    limit: 9,
  })

  res.render('index', { news })
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
