import express, { Request, Response } from 'express'
import cors from 'cors'
import { Server } from 'typescript-rest'

import { ConnectDB } from './src/services';
import routes from './src/routes'

const dotenv = require('dotenv')
dotenv.config()

export const app: express.Application = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// DB connection
app.use(async (req: Request, res: Response, next) => {
  await ConnectDB(() => {
    res.json({ error: 'Failed to connect to DB. Please Try again' })
  }, next)
})

Server.buildServices(app)

app.use('/api', routes)

app.listen(3001, () => { console.log('Example app listening on port 3001!') })
