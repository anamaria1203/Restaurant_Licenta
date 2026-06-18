import db from '../models/index.mjs'

const getPreparate = async (req, res, next) => {
  try {
    const where = { available: true }
    if (req.query.categorie) where.category = req.query.categorie
    if (req.query.subcategorie) where.subcategory = req.query.subcategorie
    const preparate = await db.Preparat.findAll({ where })
    res.json(preparate)
  } catch (err) { next(err) }
}

const toggleDisponibil = async (req, res, next) => {
  try {
    const { id } = req.params
    const preparat = await db.Preparat.findByPk(id)
    if (!preparat) return res.status(404).json({ error: 'Preparatul nu a fost găsit' })
    await preparat.update({ available: !preparat.available })
    res.json({ id: preparat.id, available: preparat.available })
  } catch (err) { next(err) }
}

const getRecomandateMeteo = async (req, res, next) => {
  try {
    const { tip } = req.query
    if (!tip || !['cald', 'rece'].includes(tip)) return res.json([])
    const preparate = await db.Preparat.findAll({
      where: { weatherType: tip, available: true },
      limit: 4
    })
    res.json(preparate)
  } catch (err) { next(err) }
}

const setTipVreme = async (req, res, next) => {
  try {
    const { id } = req.params
    const { tip_vreme } = req.body
    if (!['cald', 'rece', 'neutru'].includes(tip_vreme)) {
      return res.status(400).json({ error: 'tip_vreme trebuie să fie cald, rece sau neutru' })
    }
    const preparat = await db.Preparat.findByPk(id)
    if (!preparat) return res.status(404).json({ error: 'Preparatul nu a fost găsit' })
    await preparat.update({ weatherType: tip_vreme })
    res.json({ id: preparat.id, weatherType: preparat.weatherType })
  } catch (err) { next(err) }
}

export default { getPreparate, toggleDisponibil, getRecomandateMeteo, setTipVreme }
