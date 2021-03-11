import uuid from 'uuid'

import { connect, disconnect } from '../../repo/database'
import { None } from '../authorize'
import { Controller } from '../controller'
import signup, { Signup } from './signup'

const user = {
  name: uuid(),
  email: `${uuid()}@test.com`,
  password: uuid(),
}

describe('service:user:signup', () => {
  beforeAll(async done => {
    await connect()
    done()
  })

  afterAll(async done => {
    await disconnect()
    done()
  })

  test('signup should work correctly', async done => {
    expect(signup).toBeTruthy()
    expect(signup).toBeInstanceOf(Controller)
    expect(signup.auth).toBeInstanceOf(None)
    expect(signup.handler).toBeInstanceOf(Signup)
    done()
  })

  test('signup handle method should return 200', async done => {
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
      body: user,
    }

    const res: any = {
      status: jest.fn(() => res),
      send: jest.fn(),
    }

    await signup.handler.handle(req, res, jest.fn())

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      payload: {
        user: expect.objectContaining({
          name: req.body.name,
          email: req.body.email,
        }),
      },
    })

    done()
  })

  test('signup handle method should return 400', async done => {
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
      status: jest.fn(() => res),
      send: jest.fn(),
    }

    await signup.handler.handle(req, res, jest.fn())

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      payload: expect.anything(),
    })

    done()
  })

  test('signup handle method should return 400', async done => {
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
      status: jest.fn(() => res),
      send: jest.fn(),
    }

    await signup.handler.handle(req, res, jest.fn())

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      payload: expect.anything(),
    })

    done()
  })

  test('signup handle method should return 409', async done => {
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
      body: user,
    }

    const res: any = {
      status: jest.fn(() => res),
      send: jest.fn(),
    }

    await signup.handler.handle(req, res, jest.fn())

    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      payload: expect.anything(),
    })

    done()
  })

  test('signup format method should work correctly', async done => {
    const actual = await signup.handler.format('desktop', 'en-US', true, {})

    expect(actual).toEqual(
      expect.objectContaining({
        success: true,
        payload: {},
      })
    )
    done()
  })
})
