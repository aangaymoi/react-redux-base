import 'core-js'

import debug from 'debug'
const log = debug('api:server')

import { connect, disconnect } from './repo/database'
import http from 'http'
import rest from './rest'
const server = http.createServer(rest)

export const PORT = process.env.PORT || `3000`

export const startup = async () => {
  await connect()
  await server.listen(PORT)
  log(`Application started on port: ${PORT}`)
}

export const cleanup = async (error: any): Promise<void> => {
  await disconnect()
  await server.close()
  log(`Application on port: ${PORT} stopped`)
  process.exit(error ? 1 : 0)
}

startup()

export const graceful = async (callback: (error?: any) => Promise<void>) => {
  process.on('rejectionHandled', callback)
  process.on('uncaughtException', callback)
  process.on('SIGINT', callback)
}

graceful(cleanup)

export default server
