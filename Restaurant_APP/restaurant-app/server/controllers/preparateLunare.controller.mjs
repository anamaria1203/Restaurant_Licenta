import db from '../models/index.mjs'

const getPreparate = async (req, res, next) => {
  try {
    const where = {}
    if (req.query.tara) where.tara = req.query.tara
    if (req.query.este_desert !== undefined) where.este_desert = req.query.este_desert === 'true'
    const preparate = await db.PreparatLunar.findAll({ where, order: [['id', 'ASC']] })
    res.json(preparate)
  } catch (err) { next(err) }
}

const createPreparat = async (req, res, next) => {
  try {
    const { tara, nume, descriere, pret, imagine, este_desert } = req.body
    if (!tara || !nume || !pret)
      return res.status(400).json({ error: 'tara, nume și pret sunt obligatorii' })
    const preparat = await db.PreparatLunar.create({ tara, nume, descriere, pret, imagine, este_desert: !!este_desert })
    res.status(201).json(preparat)
  } catch (err) { next(err) }
}

const updatePreparat = async (req, res, next) => {
  try {
    const preparat = await db.PreparatLunar.findByPk(req.params.id)
    if (!preparat) return res.status(404).json({ error: 'Preparatul nu a fost găsit' })
    const { nume, descriere, pret, imagine, este_desert } = req.body
    await preparat.update({ nume, descriere, pret, imagine, este_desert })
    res.json(preparat)
  } catch (err) { next(err) }
}

const deletePreparat = async (req, res, next) => {
  try {
    const preparat = await db.PreparatLunar.findByPk(req.params.id)
    if (!preparat) return res.status(404).json({ error: 'Preparatul nu a fost găsit' })
    await preparat.destroy()
    res.json({ message: 'Preparat șters cu succes' })
  } catch (err) { next(err) }
}

export default { getPreparate, createPreparat, updatePreparat, deletePreparat }
