import debug from 'debug'
const log = debug('api:service:user:listing')

import { Admin } from '../authorize'
import { IHandler, Controller } from '../controller'

import userRepo, { User } from '../../repo/user'

export class Listing implements IHandler {
  public handle = async (req: any, res: any, next: Function): Promise<void> => {
    let { field, order, offset, limit } = req.query

    const errors = []

    if (!field) {
      errors.push(`"field" must be specified`)
    }

    if (errors.length) {
      const success = false
      const payload = { errors }
      const response = await this.format(
        req.get('X-Device'),
        req.get('X-Locate'),
        success,
        payload
      )
      return res.status(400).send(response)
    }

    order = order === 'asc' ? 'asc' : 'desc'
    limit = parseInt(limit) >= 0 ? parseInt(limit) : 10
    offset = parseInt(offset) >= 0 ? parseInt(offset) : 0
    const users = await userRepo.listing(field, {
      order,
      limit,
      offset,
    })

    const success = true
    const payload = { users }
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

const listing = new Controller(new Admin(), new Listing())

export default listing
