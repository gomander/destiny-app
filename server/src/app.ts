import * as env from 'dotenv-flow'
env.config()
import express from 'express'
const app = express()
const port = process.env.PORT || 9001
import routes from './routes'

app.use(express.json())

app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`)
})