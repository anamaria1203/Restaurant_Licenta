import authRouter from './auth-router.mjs'
import apiRouter from './api-router.mjs'
import meniuRouter from './meniu-router.mjs'
import lunaRouter from './luna-router.mjs'

const routers = {
  auth: authRouter,
  api: apiRouter,
  meniu: meniuRouter,
  luna: lunaRouter
}

export default routers
