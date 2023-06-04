import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import environment from './utils/environment'
import apis from './routes'
import { helperCheck } from './Http/helperCheck/controllers'
import { join } from 'path'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('combined'))

app.use('/uploads', express.static(join(__dirname, '..', '/uploads')))


app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("method", req.method)
    console.log("path", req.path)
    console.log("body", req.body)
    next()
})

app.get('/', helperCheck)
app.use(environment.BASE_PATH, apis)

const server = app.listen(environment.NODE_PORT, environment.NODE_HOST, () => {
    console.log("server listening on port", environment.NODE_HOST + "::" + environment.NODE_PORT, environment.BASE_PATH)
})