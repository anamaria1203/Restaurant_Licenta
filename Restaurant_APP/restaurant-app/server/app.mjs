import express from 'express'
import cors from 'cors'
import routers from './routers/index.mjs'
import middleware from './middleware/index.mjs'

const app = express()

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

app.use('/auth', routers.auth)

app.use(middleware.genericError)
app.use('/api', routers.api)

export default app