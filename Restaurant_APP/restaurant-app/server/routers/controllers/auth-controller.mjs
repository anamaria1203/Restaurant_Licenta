import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../../models/index.mjs'

const SECRET = process.env.JWT_SECRET || 'villa-ana-secret'

const register = async (req, res, next) => {
  try {
    const { nume, email, password, tip } = req.body

    if (!nume || !email || !password) {
      return res.status(400).json({ error: 'Toate campurile sunt obligatorii' })
    }

    const userExistent = await db.User.findOne({ where: { email } })
    if (userExistent) {
      return res.status(400).json({ error: 'Email-ul este deja inregistrat' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await db.User.create({
       nume,
      email,
      passwordHash,
      tip: tip || 'client'
    })

    const token = jwt.sign(
      { id: user.id, email: user.email, tip: user.tip },
      SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      token,
      user: {
        id: user.id,
        nume: user.nume,
        email: user.email,
        tip: user.tip
      }
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

    res.json({
      token,
      user: {
        id: user.id,
        nume: user.nume,
        email: user.email,
        tip: user.tip
      }
    })
  } catch (err) {
    next(err)
  }
}

const logout = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await db.User.findOne({ where: { email } })
    if (user) {
      await user.update({ token: null })
    }
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
    const passwordHash = await bcrypt.hash(parolaNoua, 10)
    await user.update({ passwordHash })
    res.json({ message: 'Parola a fost resetata cu succes!' })
  } catch (err) {
    next(err)
  }
}

const authController = { register, login, logout, verificaEmail, resetParola }

export default authController