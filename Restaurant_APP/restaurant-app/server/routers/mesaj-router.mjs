import express from 'express'
import { authMiddleware, authManager } from '../middleware/auth.mjs'
import mesajController from '../controllers/mesaj.controller.mjs'

const router = express.Router()

router.post('/', authMiddleware, mesajController.trimiteMesaj)
router.get('/ale-mele', authMiddleware, mesajController.getMesajeleMe)
router.get('/toate', authManager, mesajController.getMesaje)
router.get('/necitite-count', authManager, mesajController.getNecititeCount)
router.put('/:id/citit', authManager, mesajController.marcheazaCitit)
router.put('/:id/raspuns', authManager, mesajController.raspundeMesaj)

export default router
