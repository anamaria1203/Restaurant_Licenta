import express from 'express'
import controllers from './controllers/index.mjs'

const authRouter = express.Router()

authRouter.post('/register', controllers.auth.register)
authRouter.post('/login', controllers.auth.login)
authRouter.post('/logout', controllers.auth.logout)
authRouter.post('/verifica-email', controllers.auth.verificaEmail)
authRouter.post('/reset-parola', controllers.auth.resetParola)

export default authRouter
