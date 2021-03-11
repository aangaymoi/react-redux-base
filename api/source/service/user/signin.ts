import debug from 'debug'
const log = debug('api:service:user:signin')

import { None } from '../authorize'
import { IHandler, Controller } from '../controller'

import { isEmail } from 'validator'

import hash from '../../tool/hash'
import userRepo, { User } from '../../repo/user'

export class Signin implements IHandler {
  public handle = async (req: any, res: any, next: Function): Promise<void> => {
    const { email, password } = req.body

    const errors = []

    if (!email) {
      errors.push(`"email" is missing`)
    }

    if (email && !isEmail(email)) {
      errors.push(`"email" is not valid`)
    }

    if (!password) {
      errors.push(`"password" is missing`)
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

    const user = await userRepo.authen(email, hash(password))

    if (!user) {
      const success = false
      const payload = { errors: ['Not Found'] }
      const response = await this.format(
        req.get('X-Device'),
        req.get('X-Locate'),
        success,
        payload
      )
      return res.status(404).send(response)
    }

    const success = true
    const payload = { user }
    const response = await this.format(
      req.get('X-Device'),
      req.get('X-Locate'),
      success,
      payload
    )
    return res
      .set('uuid', user.uuid)
      .status(200)
      .send(response)
  }

  public format = async (
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
            return {
              success,
              payload,
            }
        }
    }
  }
}

const signin = new Controller(new None(), new Signin())

export default signin
