import { Router, Request, Response } from 'express'
import authRouter from '@/routes/auth.routes'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.render('index')
})

router.use('/auth', authRouter)

// not found page
router.use((_: Request, res: Response) => {
  res.render('pages/404')
})

export default router
