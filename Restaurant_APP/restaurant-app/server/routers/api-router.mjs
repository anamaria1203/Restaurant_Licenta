import express from 'express'
import db from '../models/index.mjs'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'villa-ana-secret'

const apiRouter = express.Router()

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Token lipsa' })
  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Token invalid' })
  }
}

apiRouter.get('/useri', authMiddleware, async (req, res, next) => {
  try {
    if (req.user.tip !== 'manager') return res.status(403).json({ error: 'Acces interzis' })
    const useri = await db.User.findAll({
      where: { deletedAt: null },
      attributes: ['id', 'nume', 'email', 'tip', 'createdAt']
    })
    res.json(useri)
  } catch (err) { next(err) }
})

apiRouter.get('/useri/stersi', authMiddleware, async (req, res, next) => {
  try {
    if (req.user.tip !== 'manager') return res.status(403).json({ error: 'Acces interzis' })
    const stersi = await db.User.findAll({
      where: { deletedAt: { [db.sequelize.Sequelize.Op.ne]: null } },
      attributes: ['id', 'nume', 'email', 'tip', 'createdAt', 'deletedAt']
    })
    res.json(stersi)
  } catch (err) { next(err) }
})

apiRouter.delete('/useri/:id', authMiddleware, async (req, res, next) => {
  try {
    if (req.user.tip !== 'manager') return res.status(403).json({ error: 'Acces interzis' })
    const user = await db.User.findByPk(req.params.id)
    if (!user) return res.status(404).json({ error: 'Userul nu a fost gasit' })
    await user.update({ deletedAt: new Date() })
    res.json({ message: 'Client sters cu succes' })
  } catch (err) { next(err) }
})

apiRouter.post('/useri/:id/restaurare', authMiddleware, async (req, res, next) => {
  try {
    if (req.user.tip !== 'manager') return res.status(403).json({ error: 'Acces interzis' })
    const user = await db.User.findByPk(req.params.id)
    if (!user) return res.status(404).json({ error: 'Userul nu a fost gasit' })
    await user.update({ deletedAt: null })
    res.json({ message: 'Client restaurat cu succes' })
  } catch (err) { next(err) }
})

export default apiRouter
