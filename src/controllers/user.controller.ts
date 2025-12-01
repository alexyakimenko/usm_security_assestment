import express from 'express'
import { User } from '@/models/user.model'
import { Role, Roles } from '@/models/role.model'

export const myProfile = (req: express.Request, res: express.Response) => {
  if (!req.user) {
    return res.redirect('/auth/login')
  }
  res.render('pages/user/profile', { profile: { user: req.user } })
}

export const profile = async (req: express.Request, res: express.Response) => {
  const username = req.params.username

  const user = await User.findOne({
    where: { username: username },
    include: {
      model: Role,
      as: 'roles',
      attributes: ['name'],
      through: { attributes: [] },
    },
  })
  if (!user) {
    return res.status(404).render('pages/404')
  }

  res.render('pages/user/profile', { profile: { user: user } })
}

export const remove = async (req: express.Request, res: express.Response) => {
  const id = req.params.id

  if (!req.user) {
    return res.sendStatus(401)
  }

  if (String((req.user as User).id) === id) {
    return res.sendStatus(400)
  }

  const user = await User.findByPk(id)
  if (!user) {
    return res.sendStatus(401)
  }

  const admin = req.user as User
  // @ts-ignore
  const roles = admin.roles as Role[]

  if (!roles.map((role) => role.name).includes(Roles.Admin)) {
    return res.sendStatus(403)
  }

  await user.destroy()

  res.redirect('/')
}

export const editProfile = async (
  req: express.Request,
  res: express.Response,
) => {
  const username = req.params.username

  if (!req.user) {
    return res.sendStatus(401)
  }

  const admin = req.user as User
  // @ts-ignore
  const roles = admin.roles as Role[]

  if (!roles.map((role) => role.name).includes(Roles.Admin)) {
    return res.status(403).redirect(`/user/profile/${username}`)
  }

  const user = await User.findOne({
    where: { username: username },
    include: {
      model: Role,
      as: 'roles',
      attributes: ['name'],
      through: { attributes: [] },
    },
  })
  if (!user) {
    return res.status(404).render('pages/404')
  }

  res.render('pages/user/edit', {
    profile: { user: user },
    roles: Object.values(Roles),
  })
}

export const edit = async (req: express.Request, res: express.Response) => {
  const id = req.params.id

  if (!req.user) {
    return res.sendStatus(401)
  }

  const user = await User.findByPk(id)
  if (!user) {
    return res.status(404).render('pages/404')
  }

  const admin = req.user as User
  // @ts-ignore
  const roles = admin.roles as Role[]

  if (!roles.map((role) => role.name).includes(Roles.Admin)) {
    return res.status(403).redirect(`/user/profile`)
  }

  user.username = req.body.username
  user.email = req.body.email

  const newRoles = await Role.findAll({
    where: { name: req.body.roles },
  })

  //@ts-ignore
  user.setRoles(newRoles)

  await user.save()

  res.redirect(`/user/profile/${user.username}`)
}

export const list = async (_req: express.Request, res: express.Response) => {
  const users = await User.findAll({
    order: [['createdAt', 'DESC']],
    include: {
      model: Role,
      as: 'roles',
      attributes: ['name'],
      through: { attributes: [] },
    },
  })

  res.render('pages/user/index', { users })
}
