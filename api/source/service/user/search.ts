import debug from 'debug'
const log = debug('api:service:user:search')

import { Admin } from '../authorize'
import { IHandler, Controller } from '../controller'

import userRepo, { User } from '../../repo/user'

export class Search implements IHandler {
  public handle = async (req: any, res: any, next: Function): Promise<void> => {
    let { name, email, exact, order, offset, limit } = req.query

    const errors = []

    if (!name && !email) {
      errors.push(`"name" or "email" must be specified`)
    }

    if (name && email) {
      errors.push(`only "name" or "email" can be specified`)
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

    exact = exact === 'true' ? true : false
    order = order === 'asc' ? 'asc' : 'desc'
    limit = parseInt(limit) >= 0 ? parseInt(limit) : 10
    offset = parseInt(offset) >= 0 ? parseInt(offset) : 0

    if (name) {
      const users = await userRepo.search('name', name, {
        exact,
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

    if (email) {
      const users = await userRepo.search('email', email, {
        exact,
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

const search = new Controller(new Admin(), new Search())

export default search
