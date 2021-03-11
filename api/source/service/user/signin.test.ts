import uuid from 'uuid'

import { connect, disconnect } from '../../repo/database'
import userRepo, { User } from '../../repo/user'

import { None } from '../authorize'
import { Controller } from '../controller'
import signin, { Signin } from './signin'

import hash from '../../tool/hash'

const rawpass = uuid()

let user: User = {
  type: 'user',
  name: uuid(),
  email: `${uuid()}@test.com`,
  password: hash(rawpass),
}

describe('service:user:signin', () => {
  beforeAll(async done => {
    await connect()
    const res = await userRepo.create(user)
    user = {
      ...user,
      ...res,
    }
    done()
  })

  afterAll(async done => {
    await disconnect()
    done()
  })

  test('signin should work correctly', async done => {
    expect(signin).toBeTruthy()
    expect(signin).toBeInstanceOf(Controller)
    expect(signin.auth).toBeInstanceOf(None)
    expect(signin.handler).toBeInstanceOf(Signin)
    done()
  })

  test('signin should work return 200', async done => {
    const req = {
      get: (key: string) => {
        switch (key) {
          case 'uuid':
            return undefined
          case 'X-Device':
            return 'desktop'
          case 'X-Locate':
            return 'en-US'
          default:
            return undefined
        }
      },
      body: {
        email: user.email,
        password: rawpass,
      },
    }

    const res: any = {
      set: jest.fn(() => res),
      status: jest.fn(() => res),
      send: jest.fn(),
    }

    await signin.handler.handle(req, res, jest.fn())

    expect(res.set).toHaveBeenCalledWith('uuid', expect.anything())
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      payload: {
        user: expect.objectContaining({
          email: req.body.email,
        }),
      },
    })

    done()
  })

  test('signin should work return 400', async done => {
    const req = {
      get: (key: string) => {
        switch (key) {
          case 'uuid':
            return undefined
          case 'X-Device':
            return 'desktop'
          case 'X-Locate':
            return 'en-US'
          default:
            return undefined
        }
      },
      body: {},
    }

    const res: any = {
      set: jest.fn(() => res),
      status: jest.fn(() => res),
      send: jest.fn(),
    }

    await signin.handler.handle(req, res, jest.fn())

    expect(res.set).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      payload: expect.anything(),
    })

    done()
  })

  test('signin should work return 400', async done => {
    const req = {
      get: (key: string) => {
        switch (key) {
          case 'uuid':
            return undefined
          case 'X-Device':
            return 'desktop'
          case 'X-Locate':
            return 'en-US'
          default:
            return undefined
        }
      },
      body: {
        email: uuid(),
      },
    }

    const res: any = {
      set: jest.fn(() => res),
      status: jest.fn(() => res),
      send: jest.fn(),
    }

    await signin.handler.handle(req, res, jest.fn())

    expect(res.set).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      payload: expect.anything(),
    })

    done()
  })

  test('signin should work return 404', async done => {
    const req = {
      get: (key: string) => {
        switch (key) {
          case 'uuid':
            return undefined
          case 'X-Device':
            return 'desktop'
          case 'X-Locate':
            return 'en-US'
          default:
            return undefined
        }
      },
      body: {
        email: `${uuid()}@test.com`,
        password: uuid(),
      },
    }

    const res: any = {
      set: jest.fn(() => res),
      status: jest.fn(() => res),
      send: jest.fn(),
    }

    await signin.handler.handle(req, res, jest.fn())

    expect(res.set).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      payload: expect.anything(),
    })

    done()
  })

  test('signin format method should work correctly', async done => {
    const actual = await signin.handler.format('desktop', 'en-US', true, {})

    expect(actual).toEqual(
      expect.objectContaining({
        success: true,
        payload: {},
      })
    )
    done()
  })
})
