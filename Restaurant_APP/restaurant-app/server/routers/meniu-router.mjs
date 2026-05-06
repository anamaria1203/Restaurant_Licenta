import express from 'express'
import controllers from '../controllers/index.mjs'

const router = express.Router()

router.get('/preparate', controllers.meniu.getPreparate)

export default router
