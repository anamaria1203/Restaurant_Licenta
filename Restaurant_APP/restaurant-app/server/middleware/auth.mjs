import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'villa-ana-secret'

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ error: 'Neautentificat' })
  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Sesiune expirata' })
  }
}

export const authManager = (req, res, next) => {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ error: 'Neautentificat' })
  try {
    const decoded = jwt.verify(token, SECRET)
    if (decoded.tip !== 'manager') return res.status(403).json({ error: 'Acces interzis' })
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Sesiune expirata' })
  }
}
