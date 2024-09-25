/* eslint-disable no-undef */
import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFoundRoute'
import { routes } from './app/routes'
import cookieParser from 'cookie-parser'
import path from 'path'
const app: Application = express()
app.use(express.static(path.join(__dirname, '../public')))
// middleware
app.use(
  cors({
    origin: ['https://car-washing-service.vercel.app', 'http://localhost:5173'],
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())

// Set the view engine to EJS
app.set('view engine', 'ejs')

// application routes
app.use('/', routes)

app.get('/', (req, res) => {
  res.send('Server is running')
})

// customize error
app.use(globalErrorHandler)
app.use(notFound)

export default app
