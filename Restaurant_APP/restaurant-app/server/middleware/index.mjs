import genericErrorMiddleware from './generic-error-middleware.mjs'
import { authMiddleware, authManager } from './auth.mjs'

const middleware = {
  genericError: genericErrorMiddleware,
  auth: authMiddleware,
  authManager
}

export default middleware
