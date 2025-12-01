import { Router, Request, Response } from 'express'
import authRouter from '@/routes/auth.routes'
import userRouter from '@/routes/user.routes'
import categoryRouter from '@/routes/category.routes'
import newsRouter from '@/routes/new.routes'
import { Category } from '@/models/category.model'
import { News } from '@/models/new.model'
import { User } from '@/models/user.model'
import { isAuth } from '@/middleware/auth.middleware'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const categories = await Category.findAll({ order: [['name', 'ASC']] })
  const activeCategoryId = req.query.category
    ? Number(req.query.category)
    : null

  const news = await News.findAll({
    include: [
      { model: Category, attributes: ['name'] },
      { model: User, attributes: ['username'] },
    ],
    where: activeCategoryId ? { category_id: activeCategoryId } : undefined,
    order: [['createdAt', 'DESC']],
    limit: 9,
  })

  res.render('index', { news, categories, activeCategoryId })
})

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/categories', isAuth, categoryRouter)
router.use('/news', newsRouter)

// not found page
router.use((_: Request, res: Response) => {
  res.render('pages/404')
})

export default router
