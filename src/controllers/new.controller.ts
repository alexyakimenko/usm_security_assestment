import express from 'express'
import { Category } from '@/models/category.model'
import { News } from '@/models/new.model'
import { User } from '@/models/user.model'
import { Op } from 'sequelize'
import { validationResult } from 'express-validator'

const getFormData = async (req: express.Request) => {
  const categories = await Category.findAll({ order: [['name', 'ASC']] })
  return {
    categories,
    errors: {
      title: req.flash('title'),
      content: req.flash('content'),
      category_id: req.flash('category_id'),
      general: req.flash('error'),
    },
    values: req.flash('prev')[0] || {},
  }
}

export const list = async (req: express.Request, res: express.Response) => {
  const news = await News.findAll({
    include: [
      { model: Category, attributes: ['name'] },
      { model: User, attributes: ['username'] },
    ],
    order: [['createdAt', 'DESC']],
  })

  res.render('pages/news/index', {
    news,
    messages: {
      success: req.flash('success'),
      error: req.flash('error'),
    },
  })
}

export const favorites = async (
  req: express.Request,
  res: express.Response,
) => {
  const user = req.user as User
  // @ts-ignore sequelize mixin for subscriptions
  const categories = await (user as any).getSubs({ order: [['name', 'ASC']] })
  const subscribedIds = categories.map((category: { id: number }) => category.id)

  const requestedCategoryId = Number(req.query.category) || null
  const activeCategoryId =
    requestedCategoryId && subscribedIds.includes(requestedCategoryId)
      ? requestedCategoryId
      : null

  const hasSubscriptions = subscribedIds.length > 0

  const news = hasSubscriptions
    ? await News.findAll({
        where: {
          category_id: activeCategoryId
            ? activeCategoryId
            : { [Op.in]: subscribedIds },
        },
        include: [
          { model: Category, attributes: ['name'] },
          { model: User, attributes: ['username'] },
        ],
        order: [['createdAt', 'DESC']],
      })
    : []

  return res.render('pages/news/favorites', {
    news,
    categories,
    activeCategoryId,
    hasSubscriptions,
  })
}

export const show = async (req: express.Request, res: express.Response) => {
  const newsItem = await News.findByPk(req.params.id, {
    include: [
      { model: Category, attributes: ['name'] },
      { model: User, attributes: ['username'] },
    ],
  })

  if (!newsItem) {
    req.flash('error', 'Новость не найдена.')
    return res.redirect('/news')
  }

  return res.render('pages/news/show', { newsItem })
}

export const renderCreate = async (
  req: express.Request,
  res: express.Response,
) => {
  const data = await getFormData(req)
  res.render('pages/news/create', data)
}

export const create = async (req: express.Request, res: express.Response) => {
  await News.create({
    title: req.body.title,
    content: req.body.content,
    category_id: req.body.category_id,
    // @ts-ignore
    author_id: req.user?.id,
  })
  req.flash('success', 'Новость опубликована.')
  return res.redirect('/news')
}

export const renderEdit = async (
  req: express.Request,
  res: express.Response,
) => {
  const newsItem = await News.findByPk(req.params.id)
  if (!newsItem) {
    req.flash('error', 'Новость не найдена.')
    return res.redirect('/news')
  }

  const categories = await Category.findAll({ order: [['name', 'ASC']] })
  const prev = req.flash('prev')[0]

  res.render('pages/news/edit', {
    newsId: newsItem.id,
    categories,
    errors: {
      title: req.flash('title'),
      content: req.flash('content'),
      category_id: req.flash('category_id'),
      general: req.flash('error'),
    },
    values: prev || newsItem,
  })
}

export const update = async (req: express.Request, res: express.Response) => {
  const newsItem = await News.findByPk(req.params.id)
  if (!newsItem) {
    req.flash('error', 'Новость не найдена.')
    return res.redirect('/news')
  }

  if (!validationResult(req).isEmpty()) {
    return res.redirect(`/news/${newsItem.id}/edit`)
  }

  await newsItem.update({
    title: req.body.title,
    content: req.body.content,
    category_id: req.body.category_id,
  })
  req.flash('success', 'Новость обновлена.')
  return res.redirect('/news')
}

export const destroy = async (req: express.Request, res: express.Response) => {
  const newsItem = await News.findByPk(req.params.id)
  if (!newsItem) {
    req.flash('error', 'Новость не найдена.')
    return res.redirect('/news')
  }

  await newsItem.destroy()
  req.flash('success', 'Новость удалена.')
  return res.redirect('/news')
}
