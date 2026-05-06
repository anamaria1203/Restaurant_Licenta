import db from '../models/index.mjs'

const getLunaActiva = async (req, res, next) => {
  try {
    let luna = await db.LunaActiva.findOne()
    if (!luna) luna = await db.LunaActiva.create({ tara: 'spaniola' })
    res.json({ tara: luna.tara })
  } catch (err) { next(err) }
}

const setLunaActiva = async (req, res, next) => {
  try {
    const { tara } = req.body
    let luna = await db.LunaActiva.findOne()
    if (!luna) {
      luna = await db.LunaActiva.create({ tara })
    } else {
      await luna.update({ tara })
    }
    res.json({ tara: luna.tara })
  } catch (err) { next(err) }
}

export default { getLunaActiva, setLunaActiva }
