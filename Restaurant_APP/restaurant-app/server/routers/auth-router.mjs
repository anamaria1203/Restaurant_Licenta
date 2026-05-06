import express from 'express'
import controllers from '../controllers/index.mjs'

const router = express.Router()

router.post('/register', controllers.auth.register)
router.post('/login', controllers.auth.login)
router.post('/admin-login', controllers.auth.adminLogin)
router.post('/logout', controllers.auth.logout)
router.post('/verifica-email', controllers.auth.verificaEmail)
router.post('/reset-parola', controllers.auth.resetParola)

export default router
