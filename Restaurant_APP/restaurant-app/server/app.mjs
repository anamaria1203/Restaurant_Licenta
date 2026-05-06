import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routers from './routers/index.mjs'
import middleware from './middleware/index.mjs'

const app = express()

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', routers.auth)
app.use(middleware.genericError)
app.use('/api', routers.api)
app.use('/meniu', routers.meniu)
app.use('/luna', routers.luna)
app.use('/meniu-lunar', routers.preparateLunare)
app.use('/comanda', routers.comanda)
app.use('/rezervare', routers.rezervare)


export default app
