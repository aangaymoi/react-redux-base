import debug from 'debug'
const log = debug('api:service:user:logout')

import { Logged } from '../authorize'
import { IHandler, Controller } from '../controller'

export class Logout implements IHandler {
  public handle = async (req: any, res: any, next: Function): Promise<void> => {
    const success = true
    const payload = { message: `Goodbye!` }
    const response = await this.format(
      req.get('X-Device'),
      req.get('X-Locate'),
      success,
      payload
    )
    return res.status(200).send(response)
  }

  public format = (
    device: string,
    locate: string,
    success: boolean,
    payload: any
  ): Promise<any> => {
    switch (device) {
      // case 'mobile':
      // case 'tablet':
      case 'desktop':
      default:
        switch (locate) {
          case 'en-US':
          default:
            return Promise.resolve({
              success,
              payload,
            })
        }
    }
  }
}

const logout = new Controller(new Logged(), new Logout())

export default logout
