import authController from './auth.controller.mjs'
import meniuController from './meniu.controller.mjs'
import lunaController from './luna.controller.mjs'
import preparateLunareController from './preparateLunare.controller.mjs'
import apiController from './api.controller.mjs'
import comandaController from './comanda.controller.mjs'
import rezervareController from './rezervare.controller.mjs'

const controllers = {
  auth: authController,
  meniu: meniuController,
  luna: lunaController,
  preparateLunare: preparateLunareController,
  api: apiController,
  comanda: comandaController,
  rezervare: rezervareController
}

export default controllers
