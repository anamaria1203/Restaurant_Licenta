import authRouter from './auth-router.mjs'
import apiRouter from './api-router.mjs'
import meniuRouter from './meniu-router.mjs'
import lunaRouter from './luna-router.mjs'
import preparateLunareRouter from './preparateLunare-router.mjs'
import comandaRouter from './comanda-router.mjs'

const routers = {
  auth: authRouter,
  api: apiRouter,
  meniu: meniuRouter,
  luna: lunaRouter,
  preparateLunare: preparateLunareRouter,
  comanda: comandaRouter
}

export default routers
