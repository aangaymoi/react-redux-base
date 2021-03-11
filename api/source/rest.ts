import debug from 'debug'
const log = debug('api:rest')

import express, { Express } from 'express'
import bodyParser from 'body-parser'

const VERSION = process.env.VERSION

import userRouter from './service/user'

const rest: Express = express()

rest.use(bodyParser.urlencoded({ extended: false }))
rest.use(bodyParser.json())

rest.use(`/api/${VERSION}`, userRouter)

export const errorHandle = async (
  error: Error,
  req: any,
  res: any,
  next: Function
) => {
  log(`error`, error)
  res.status(500).json({ success: false, payload: { error } })
}

rest.use(errorHandle)

export default rest
