import express from 'express'
import db from '../models/index.mjs'

const router = express.Router()

router.get('/activa', async (req, res) => {
  try {
    let luna = await db.LunaActiva.findOne()
    if (!luna) {
      luna = await db.LunaActiva.create({ tara: 'spaniola' })
    }
    res.json({ tara: luna.tara })
  } catch (err) {
    res.status(500).json({ error: 'Eroare server' })
  }
})

router.put('/activa', async (req, res) => {
  try {
    const { tara } = req.body
    let luna = await db.LunaActiva.findOne()
    if (!luna) {
      luna = await db.LunaActiva.create({ tara })
    } else {
      await luna.update({ tara })
    }
    res.json({ tara: luna.tara })
  } catch (err) {
    res.status(500).json({ error: 'Eroare server' })
  }
})

export default router
