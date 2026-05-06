import express from 'express'
import { authManager } from '../middleware/auth.mjs'
import controllers from '../controllers/index.mjs'

const router = express.Router()

router.get('/useri', authManager, controllers.api.getUseri)
router.get('/useri/stersi', authManager, controllers.api.getUseriStersi)
router.delete('/useri/:id', authManager, controllers.api.stergeUser)
router.post('/useri/:id/restaurare', authManager, controllers.api.restaureazaUser)

export default router
