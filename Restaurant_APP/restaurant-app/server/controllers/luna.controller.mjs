import db from '../models/index.mjs'

const getLunaActiva = async (req, res, next) => {
  try {
    let luna = await db.LunaActiva.findOne()
    if (!luna) luna = await db.LunaActiva.create({ country: 'spaniola' })
    res.json({ tara: luna.country })
  } catch (err) { next(err) }
}

const setLunaActiva = async (req, res, next) => {
  try {
    const { tara } = req.body
    let luna = await db.LunaActiva.findOne()
    if (!luna) {
      luna = await db.LunaActiva.create({ country: tara })
    } else {
      await luna.update({ country: tara })
    }
    res.json({ tara: luna.country })
  } catch (err) { next(err) }
}

export default { getLunaActiva, setLunaActiva }
