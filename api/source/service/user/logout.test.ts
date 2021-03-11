import uuid from 'uuid'

import { connect, disconnect } from '../../repo/database'
import userRepo, { User } from '../../repo/user'

import { Logged } from '../authorize'
import { Controller } from '../controller'
import logout, { Logout } from './logout'

import hash from '../../tool/hash'

const rawpass = uuid()

let user: User = {
  type: 'user',
  name: uuid(),
  email: `${uuid()}@test.com`,
  password: hash(rawpass),
}

describe('service:user:logout', () => {
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

  test('logout should work correctly', async done => {
    expect(logout).toBeTruthy()
    expect(logout).toBeInstanceOf(Controller)
    expect(logout.auth).toBeInstanceOf(Logged)
    expect(logout.handler).toBeInstanceOf(Logout)
    done()
  })

  test('logout should work return 200', async done => {
    const req = {
      get: (key: string) => {
        switch (key) {
          case 'uuid':
            return user.uuid
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

    await logout.handler.handle(req, res, jest.fn())

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      payload: { message: `Goodbye!` },
    })

    done()
  })

  test('logout format method should work correctly', async done => {
    let actual = await logout.handler.format('desktop', 'en-US', true, {})

    expect(actual).toEqual(
      expect.objectContaining({
        success: true,
        payload: {},
      })
    )

    actual = await logout.handler.format('desktop', 'en-US', true, {})

    expect(actual).toEqual(
      expect.objectContaining({
        success: true,
        payload: {},
      })
    )

    done()
  })
})
