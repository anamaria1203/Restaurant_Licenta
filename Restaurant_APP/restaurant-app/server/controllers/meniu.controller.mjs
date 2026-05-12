import db from '../models/index.mjs'

const getPreparate = async (req, res, next) => {
  try {
    const where = { disponibil: true }
    if (req.query.categorie) where.categorie = req.query.categorie
    if (req.query.subcategorie) where.subcategorie = req.query.subcategorie
    const preparate = await db.Preparat.findAll({ where })
    res.json(preparate)
  } catch (err) { next(err) }
}

const toggleDisponibil = async (req, res, next) => {
  try {
    const { id } = req.params
    const preparat = await db.Preparat.findByPk(id)
    if (!preparat) return res.status(404).json({ error: 'Preparatul nu a fost găsit' })
    await preparat.update({ disponibil: !preparat.disponibil })
    res.json({ id: preparat.id, disponibil: preparat.disponibil })
  } catch (err) { next(err) }
}

export default { getPreparate, toggleDisponibil }
