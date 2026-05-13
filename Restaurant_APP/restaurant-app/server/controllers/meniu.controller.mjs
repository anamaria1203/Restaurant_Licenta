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

const getRecomandateMeteo = async (req, res, next) => {
  try {
    const { tip } = req.query
    if (!tip || !['cald', 'rece'].includes(tip)) return res.json([])
    const preparate = await db.Preparat.findAll({
      where: { tip_vreme: tip, disponibil: true },
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
    await preparat.update({ tip_vreme })
    res.json({ id: preparat.id, tip_vreme: preparat.tip_vreme })
  } catch (err) { next(err) }
}

export default { getPreparate, toggleDisponibil, getRecomandateMeteo, setTipVreme }
