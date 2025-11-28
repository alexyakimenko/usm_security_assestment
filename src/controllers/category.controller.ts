import express from 'express'
import { Category } from '@/models/category.model'
import { validationResult } from 'express-validator'

export const list = async (req: express.Request, res: express.Response) => {
  const categories = await Category.findAll({ order: [['createdAt', 'DESC']] })

  res.render('pages/categories/index', {
    categories,
    messages: {
      success: req.flash('success'),
      error: req.flash('error'),
    },
  })
}

export const renderCreate = (req: express.Request, res: express.Response) => {
  res.render('pages/categories/create', {
    prev: req.flash('prev')[0] || {},
    errors: {
      name: req.flash('name'),
      description: req.flash('description'),
      general: req.flash('error'),
    },
  })
}

export const create = async (req: express.Request, res: express.Response) => {
  await Category.create({
    name: req.body.name,
    description: req.body.description,
  })

  req.flash('success', 'Категория создана.')

  return res.redirect('/categories')
}

export const renderEdit = async (
  req: express.Request,
  res: express.Response,
) => {
  const category = await Category.findByPk(req.params.id)
  if (!category) {
    req.flash('error', 'Категория не найдена.')
    return res.redirect('/categories')
  }

  res.render('pages/categories/edit', {
    categoryId: category.id,
    errors: {
      name: req.flash('name'),
      description: req.flash('description'),
      general: req.flash('error'),
    },
    category: req.flash('prev')[0] || category,
  })
}

export const update = async (req: express.Request, res: express.Response) => {
  if (!validationResult(req).isEmpty()) {
    return res.redirect(`/categories/${req.params.id}/edit`)
  }

  const category = await Category.findByPk(req.params.id)
  if (!category) {
    req.flash('error', 'Категория не найдена.')
    return res.redirect('/categories')
  }

  await category.update({
    name: req.body.name,
    description: req.body.description,
  })
  req.flash('success', 'Категория обновлена.')
  return res.redirect('/categories')
}

export const destroy = async (req: express.Request, res: express.Response) => {
  const category = await Category.findByPk(req.params.id)
  if (!category) {
    req.flash('error', 'Категория не найдена.')
    return res.redirect('/categories')
  }

  await category.destroy()
  req.flash('success', 'Категория удалена.')
  return res.redirect('/categories')
}
