import express from 'express'
import { authManager } from '../middleware/auth.mjs'
import controllers from '../controllers/index.mjs'

const router = express.Router()

router.get('/preparate', controllers.preparateLunare.getPreparate)
router.post('/preparate', authManager, controllers.preparateLunare.createPreparat)
router.put('/preparate/:id', authManager, controllers.preparateLunare.updatePreparat)
router.delete('/preparate/:id', authManager, controllers.preparateLunare.deletePreparat)

export default router
