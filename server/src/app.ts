import { env } from 'node:process'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes/index.ts'

const app = express()
app.use(cors({ origin: /localhost/ }))
app.use(express.json())
app.use(morgan('dev'))

app.use(routes)

const port = env.PORT || 9001
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
