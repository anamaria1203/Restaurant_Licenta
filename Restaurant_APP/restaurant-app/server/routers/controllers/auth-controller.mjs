import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../../models/index.mjs'

const SECRET = process.env.JWT_SECRET || 'villa-ana-secret'
const ADMIN_CODE = process.env.ADMIN_CODE || 'villaana2024'

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000
}

const register = async (req, res, next) => {
  try {
    const { nume, email, password, codAdmin } = req.body

    if (!nume || !email || !password) {
      return res.status(400).json({ error: 'Toate campurile sunt obligatorii' })
    }

    const userExistent = await db.User.findOne({ where: { email } })
    if (userExistent) {
      return res.status(400).json({ error: 'Email-ul este deja inregistrat' })
    }

    let tip = 'client'
    if (codAdmin !== undefined) {
      if (codAdmin !== ADMIN_CODE) {
        return res.status(403).json({ error: 'Cod administrator incorect!' })
      }
      tip = 'manager'
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await db.User.create({ nume, email, passwordHash, tip })

    const token = jwt.sign(
      { id: user.id, email: user.email, tip: user.tip },
      SECRET,
      { expiresIn: '7d' }
    )

    await user.update({ token })
    res.cookie('token', token, COOKIE_OPTIONS)

    res.status(201).json({
      user: { id: user.id, nume: user.nume, email: user.email, tip: user.tip }
    })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email si parola sunt obligatorii' })
    }

    const user = await db.User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Email sau parola incorecta' })
    }

    if (user.deletedAt !== null) {
      return res.status(403).json({ error: 'Acest cont a fost dezactivat!' })
    }

    const passwordCorect = await bcrypt.compare(password, user.passwordHash)
    if (!passwordCorect) {
      return res.status(401).json({ error: 'Parola incorecta!' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, tip: user.tip },
      SECRET,
      { expiresIn: '7d' }
    )

    await user.update({ token })
    res.cookie('token', token, COOKIE_OPTIONS)

    res.json({
      user: { id: user.id, nume: user.nume, email: user.email, tip: user.tip }
    })
  } catch (err) {
    next(err)
  }
}

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email si parola sunt obligatorii' })
    }

    const user = await db.User.findOne({ where: { email, deletedAt: null } })
    if (!user) {
      return res.status(401).json({ error: 'Email sau parola incorecta' })
    }

    const passwordCorect = await bcrypt.compare(password, user.passwordHash)
    if (!passwordCorect) {
      return res.status(401).json({ error: 'Parola incorecta!' })
    }

    if (user.tip !== 'manager') {
      return res.status(403).json({ error: 'Acest cont nu are drepturi de administrator!' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, tip: user.tip },
      SECRET,
      { expiresIn: '7d' }
    )

    await user.update({ token })
    res.cookie('token', token, COOKIE_OPTIONS)

    res.json({
      user: { id: user.id, nume: user.nume, email: user.email, tip: user.tip }
    })
  } catch (err) {
    next(err)
  }
}

const logout = async (req, res, next) => {
  try {
    const token = req.cookies?.token
    if (token) {
      try {
        const decoded = jwt.verify(token, SECRET)
        const user = await db.User.findByPk(decoded.id)
        if (user) await user.update({ token: null })
      } catch {
        
      }
    }
    res.clearCookie('token')
    res.json({ message: 'Deconectat cu succes' })
  } catch (err) {
    next(err)
  }
}

const verificaEmail = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await db.User.findOne({ where: { email } })
    if (!user) {
      return res.status(404).json({ error: 'Nu exista niciun cont cu acest email!' })
    }
    if (user.deletedAt !== null) {
      return res.status(403).json({ error: 'Acest cont a fost dezactivat. Resetarea parolei nu este posibila.' })
    }
    res.json({ message: 'Email gasit!' })
  } catch (err) {
    next(err)
  }
}

const resetParola = async (req, res, next) => {
  try {
    const { email, parolaNoua } = req.body
    const user = await db.User.findOne({ where: { email } })
    if (!user) {
      return res.status(404).json({ error: 'Nu exista niciun cont cu acest email!' })
    }
    if (user.deletedAt !== null) {
      return res.status(403).json({ error: 'Acest cont a fost dezactivat. Resetarea parolei nu este posibila.' })
    }
    const passwordHash = await bcrypt.hash(parolaNoua, 10)
    await user.update({ passwordHash })
    res.json({ message: 'Parola a fost resetata cu succes!' })
  } catch (err) {
    next(err)
  }
}

const authController = { register, login, adminLogin, logout, verificaEmail, resetParola }

export default authController
