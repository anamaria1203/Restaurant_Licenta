import express from 'express'
import controllers from '../controllers/index.mjs'

const router = express.Router()

router.get('/activa', controllers.luna.getLunaActiva)
router.put('/activa', controllers.luna.setLunaActiva)

export default router
