import debug from 'debug'
const log = debug('api:service:user:signup')

import { None } from '../authorize'
import { IHandler, Controller } from '../controller'

import { isEmail } from 'validator'

import hash from '../../tool/hash'
import userRepo, { User } from '../../repo/user'

export class Signup implements IHandler {
  public handle = async (req: any, res: any, next: Function): Promise<void> => {
    const { name, email, password } = req.body

    const errors = []

    if (!name) {
      errors.push(`"name" is missing`)
    }

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

    const user = await userRepo.create({
      type: 'user',
      name,
      email,
      password: hash(password),
    } as User)

    if (!user) {
      const success = false
      const payload = { errors: ['Conflict'] }
      const response = await this.format(
        req.get('X-Device'),
        req.get('X-Locate'),
        success,
        payload
      )
      return res.status(409).send(response)
    }

    const success = true
    const payload = { user }
    const response = await this.format(
      req.get('X-Device'),
      req.get('X-Locate'),
      success,
      payload
    )
    return res.status(200).send(response)
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

const signup = new Controller(new None(), new Signup())

export default signup
