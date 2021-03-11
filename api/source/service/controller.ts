import debug from 'debug'
const log = debug('api:service:controller')

import { IAuth } from './authorize'

export type Handle = {
  (req: any, res: any, next: Function): Promise<void>
}

export type ErrorHandle = {
  (err: Error, req: any, res: any, next: Function): Promise<void>
}

export type Format = {
  (device: string, locate: string, success: boolean, payload: any): Promise<any>
}

export interface IHandler {
  handle: Handle
  format: Format
}

export class Controller {
  public auth: IAuth
  public handler: IHandler
  constructor(auth: IAuth, handler: IHandler) {
    this.auth = auth
    this.handler = handler
  }
  public handle = async (req: any, res: any, next: Function): Promise<void> => {
    const token = req.get('uuid')
    const uuid = await this.auth.check(token)
    if (uuid !== undefined) {
      res.set('uuid', uuid)
      this.handler.handle(req, res, next)
    } else {
      const success = false
      const payload = { errors: ['Unauthorized'] }
      const response = await this.handler.format(
        req.get('X-Device'),
        req.get('X-Locate'),
        success,
        payload
      )
      res.status(401).send(response)
    }
  }
}
