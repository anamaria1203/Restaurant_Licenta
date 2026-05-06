import express from 'express'
import controllers from '../controllers/index.mjs'
import { authMiddleware, authManager } from '../middleware/auth.mjs'

const router = express.Router()

router.post('/', authMiddleware, controllers.comanda.creeazaComanda)
router.get('/ale-mele', authMiddleware, controllers.comanda.getComenziUser)
router.get('/toate', authManager, controllers.comanda.getComenziAdmin)
router.put('/:id/status', authManager, controllers.comanda.updateStatusComanda)
router.put('/:id/items', authMiddleware, controllers.comanda.updateComandaItems)

export default router
