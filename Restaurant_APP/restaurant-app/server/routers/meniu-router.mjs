import express from 'express'
import controllers from '../controllers/index.mjs'
import { authManager } from '../middleware/auth.mjs'

const router = express.Router()

router.get('/preparate', controllers.meniu.getPreparate)
router.put('/preparate/:id/disponibil', authManager, controllers.meniu.toggleDisponibil)

export default router
