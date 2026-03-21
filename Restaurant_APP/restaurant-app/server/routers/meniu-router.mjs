import express from 'express'
import db from '../models/index.mjs'

const meniuRouter = express.Router()


meniuRouter.get('/preparate', async (req, res, next) => {
  try {
    const where = { disponibil: true }
    if (req.query.categorie) {
      where.categorie = req.query.categorie
    }
    if (req.query.subcategorie) {
      where.subcategorie = req.query.subcategorie
    }
    const preparate = await db.Preparat.findAll({ where })
    res.json(preparate)
  } catch (err) { next(err) }
})

export default meniuRouter
