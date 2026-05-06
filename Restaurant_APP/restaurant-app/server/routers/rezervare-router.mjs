import express from 'express'
import controllers from '../controllers/index.mjs'
import { authMiddleware, authManager } from '../middleware/auth.mjs'

const router = express.Router()

router.post('/', authMiddleware, controllers.rezervare.creeazaRezervare)
router.get('/ale-mele', authMiddleware, controllers.rezervare.getRezervariMele)
router.get('/are-rezervare-confirmata', authMiddleware, controllers.rezervare.areRezervareConfirmata)
router.get('/toate', authManager, controllers.rezervare.getRezervariAdmin)
router.put('/:id/status', authManager, controllers.rezervare.updateStatusRezervare)
router.put('/:id/anuleaza', authMiddleware, controllers.rezervare.anuleazaRezervare)

export default router
