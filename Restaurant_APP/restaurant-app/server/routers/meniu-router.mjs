import express from 'express'
import controllers from '../controllers/index.mjs'
import { authManager } from '../middleware/auth.mjs'

const router = express.Router()

router.get('/preparate', controllers.meniu.getPreparate)
router.get('/recomandate-meteo', controllers.meniu.getRecomandateMeteo)
router.put('/preparate/:id/disponibil', authManager, controllers.meniu.toggleDisponibil)
router.put('/preparate/:id/tip-vreme', authManager, controllers.meniu.setTipVreme)

export default router
