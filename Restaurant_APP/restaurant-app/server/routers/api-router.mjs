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
    if (req.user.tip !== 'manager') {
      return res.status(403).json({ error: 'Acces interzis' })
    }
    const useri = await db.User.findAll({
      attributes: ['id', 'nume', 'email', 'tip', 'createdAt']
    })
    res.json(useri)
  } catch (err) {
    next(err)
  }
})

export default apiRouter