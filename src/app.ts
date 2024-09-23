import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFoundRoute'
import { routes } from './app/routes'
import cookieParser from 'cookie-parser'
import { join } from 'path'
const app: Application = express()

// middleware
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))
app.use(express.json())
app.use(cookieParser())

// Set the view engine to EJS
app.set('view engine', 'ejs')
// Set the path to the 'views' folder
// eslint-disable-next-line no-undef
app.set('views', join(__dirname, './views'))

// application routes
app.use('/', routes)

app.get('/', (req, res) => {
  res.send('Server is running')
})

// customize error
app.use(globalErrorHandler)
app.use(notFound)

export default app
